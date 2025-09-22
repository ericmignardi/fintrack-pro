import { body, param } from "express-validator";

export const createBudgetValidation = [
  body("name").notEmpty().withMessage("Budget name is required"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
  body("budgetAmount")
    .notEmpty()
    .withMessage("Budget amount is required")
    .isNumeric()
    .withMessage("Budget amount must be a number"),
  body("period")
    .notEmpty()
    .withMessage("Budget period is required")
    .isIn(["WEEKLY", "MONTHLY", "YEARLY"])
    .withMessage("Period must be WEEKLY, MONTHLY, or YEARLY"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date"),
];

export const updateBudgetValidation = [
  param("id")
    .notEmpty()
    .withMessage("Budget ID is required")
    .isInt({ min: 1 })
    .withMessage("Budget ID must be a positive integer"),
  body("name").optional().notEmpty().withMessage("Budget name cannot be empty"),
  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
  body("budgetAmount")
    .optional()
    .isNumeric()
    .withMessage("Budget amount must be a number"),
  body("period")
    .optional()
    .isIn(["WEEKLY", "MONTHLY", "YEARLY"])
    .withMessage("Period must be WEEKLY, MONTHLY, or YEARLY"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date"),
];

export const budgetIdParamValidation = [
  param("id")
    .notEmpty()
    .withMessage("Budget ID is required")
    .isInt({ min: 1 })
    .withMessage("Budget ID must be a positive integer"),
];
