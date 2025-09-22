import { body, param } from "express-validator";

export const createGoalValidation = [
  body("title").notEmpty().withMessage("Goal title is required"),
  body("targetAmount")
    .notEmpty()
    .withMessage("Target amount is required")
    .isNumeric()
    .withMessage("Target amount must be a number"),
  body("currentAmount")
    .optional()
    .isNumeric()
    .withMessage("Current amount must be a number"),
  body("targetDate")
    .notEmpty()
    .withMessage("Target date is required")
    .isISO8601()
    .withMessage("Target date must be a valid date"),
  body("status")
    .optional()
    .isIn(["ACTIVE", "COMPLETED", "PAUSED"])
    .withMessage("Status must be ACTIVE, COMPLETED, or PAUSED"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const updateGoalValidation = [
  param("id")
    .notEmpty()
    .withMessage("Goal ID is required")
    .isInt({ min: 1 })
    .withMessage("Goal ID must be a positive integer"),
  body("title").optional().notEmpty().withMessage("Goal title cannot be empty"),
  body("targetAmount")
    .optional()
    .isNumeric()
    .withMessage("Target amount must be a number"),
  body("currentAmount")
    .optional()
    .isNumeric()
    .withMessage("Current amount must be a number"),
  body("targetDate")
    .optional()
    .isISO8601()
    .withMessage("Target date must be a valid date"),
  body("status")
    .optional()
    .isIn(["ACTIVE", "COMPLETED", "PAUSED"])
    .withMessage("Status must be ACTIVE, COMPLETED, or PAUSED"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const goalIdParamValidation = [
  param("id")
    .notEmpty()
    .withMessage("Goal ID is required")
    .isInt({ min: 1 })
    .withMessage("Goal ID must be a positive integer"),
];
