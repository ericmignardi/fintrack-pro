import { body } from "express-validator";

export const registerValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("Password is required"),
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
];

export const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
