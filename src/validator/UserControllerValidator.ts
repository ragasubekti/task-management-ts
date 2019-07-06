import { check } from "express-validator";

export const RegisterValidator = [
  check("username")
    .not()
    .isEmpty()
    .isLength({
      min: 6
    }),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
];
