import { check } from "express-validator";

export const RegisterValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({
      min: 6
    })
    .withMessage("Username minimal length is 6 characters"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password minimal length is 6 characters")
];
