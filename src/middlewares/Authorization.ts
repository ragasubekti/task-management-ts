import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthorizationRequest extends Request {
  decoded?: any;
}

export const IsAuthorized = async (
  req: AuthorizationRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      message: "Authorization header missing"
    });
  }

  // Take the second part of authorization after `Bearer`
  const token = authorization.split(" ")[1];

  const isVerified = await jwt.verify(
    token,
    process.env.JWT_SECRET || "xcidic"
  );

  if (!isVerified) {
    return res.status(401).send({
      message: "Cannot verify token"
    });
  }

  req.decoded = isVerified;
  next();
};
