import { body, param } from "express-validator";

export const createTransactionValidation = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["INCOME", "EXPENSE"])
    .withMessage("Transaction type must be INCOME or EXPENSE"),
  body("transactionDate")
    .notEmpty()
    .withMessage("Transaction date is required")
    .isISO8601()
    .withMessage("Transaction date must be a valid date"),
  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const updateTransactionValidation = [
  param("id")
    .notEmpty()
    .withMessage("Transaction ID is required")
    .isInt({ min: 1 })
    .withMessage("Transaction ID must be a positive integer"),
  body("amount").optional().isNumeric().withMessage("Amount must be a number"),
  body("type")
    .optional()
    .isIn(["INCOME", "EXPENSE"])
    .withMessage("Transaction type must be INCOME or EXPENSE"),
  body("transactionDate")
    .optional()
    .isISO8601()
    .withMessage("Transaction date must be a valid date"),
  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const transactionIdParamValidation = [
  param("id")
    .notEmpty()
    .withMessage("Transaction ID is required")
    .isInt({ min: 1 })
    .withMessage("Transaction ID must be a positive integer"),
];

export const categoryIdParamValidation = [
  param("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
];
