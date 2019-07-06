import { Request, Response } from "express";
import { validationResult } from "express-validator";

import bcrypt from "bcryptjs";

import UserModel from "../models/UserModel";
import { create } from "domain";

export const Register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({
      errors: errors.mapped()
    });
  }

  const { username, password } = req.body;

  const findSameUsername = await UserModel.findOne({
    username
  });

  if (findSameUsername) {
    return res.status(422).send({
      message: "Username is already exists"
    });
  }

  const salt = await bcrypt.genSaltSync(7);
  const passwordHash = await bcrypt.hashSync(password, salt);

  const createUser = await new UserModel({
    username,
    password: passwordHash,
    isManager: false
  }).save();

  return res.status(201).send({
    message: "Successfully created user",
    data: createUser
  });
};
