import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const Register = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({
      errors: errors.mapped()
    });
  }
};
