import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Iuser } from "../model/User.js";

export interface AuthenticatedRequest extends Request {
  user?: Iuser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({
        message: "please login",
      });
      return;
    }
    const token = authHeader.split(" ")[1];
    const decodeValue = jwt.verify(
      token,
      process.env.JWT_SEC as string,
    ) as JwtPayload;

    if (!decodeValue || !decodeValue.user) {
      res.status(401).json({
        message: "invalid user",
      });
      return;
    }
    req.user = decodeValue.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Please login jwt error",
    });
  }
};
