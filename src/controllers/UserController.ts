import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { compareSync, hashSync, genSaltSync } from "bcryptjs";

import UserModel, { IUserModel } from "../models/UserModel";

export const Register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({
      errors: errors.mapped()
    });
  }

  const { name, username, password } = req.body;

  const findSameUsername = await UserModel.findOne({
    username
  });

  if (findSameUsername) {
    return res.status(422).send({
      message: "Username is already exists"
    });
  }

  const salt = await genSaltSync(7);
  const passwordHash = await hashSync(password, salt);

  const createUser = await new UserModel({
    name,
    username,
    password: passwordHash,
    isManager: false
  }).save();

  return res.status(201).send({
    message: "Successfully created user",
    data: createUser
  });
};

export const Login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({
      errors: errors.mapped()
    });
  }

  const { username, password } = req.body;

  const account = <IUserModel | null>await UserModel.findOne({
    username
  });

  // If checkAccount doesn't exists just throw an error
  if (!account) {
    return res.status(401).send({
      message: "User doesn't exists"
    });
  }

  const checkHash = await compareSync(password, account.password);

  if (!checkHash) {
    return res.status(401).send({
      message: `Password doesn't match to our database`
    });
  }

  const token = await jwt.sign(
    {
      id: account._id,
      isManager: account.isManager,
      name: account.name
    },
    process.env.JWT_SECRET || "xcidic"
  );

  return res.status(201).send({
    message: "Successfully logged in",
    token
  });
};

export const SetupManager = async (req: Request, res: Response) => {
  try {
    const checkManager = await UserModel.findOne({
      username: "manager"
    });

    if (checkManager) {
      return res.status(422).send({
        message: "Manager already exists"
      });
    }

    const salt = await genSaltSync(7);
    const passwordHash = await hashSync("manager", salt);

    const create = await new UserModel({
      username: "manager",
      password: "manager",
      name: "XCIDIC Task Manager",
      isManager: true
    });

    return res.status(201).send({
      message: "Successfully Registered Manager"
    });
  } catch (e) {
    return res.status(500).send({
      message: `Oops! There's an error on our end`
    });
  }
};
