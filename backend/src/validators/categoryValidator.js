import { body, param } from "express-validator";

export const createCategoryValidation = [
  body("name").notEmpty().withMessage("Category name is required"),
  body("type")
    .notEmpty()
    .withMessage("Category type is required")
    .isIn(["INCOME", "EXPENSE"])
    .withMessage("Category type must be INCOME or EXPENSE"),
  body("color")
    .optional()
    .isHexColor()
    .withMessage("Color must be a valid hex code"),
  body("icon").optional().isString().withMessage("Icon must be a string"),
];

export const updateCategoryValidation = [
  param("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Category name cannot be empty"),
  body("type")
    .optional()
    .isIn(["INCOME", "EXPENSE"])
    .withMessage("Category type must be INCOME or EXPENSE"),
  body("color")
    .optional()
    .isHexColor()
    .withMessage("Color must be a valid hex code"),
  body("icon").optional().isString().withMessage("Icon must be a string"),
];
