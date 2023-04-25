import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { userService } from "../services";

export default function (req: any, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }
  const accessToken = token.split(" ")[1];
  const secret: string = process.env.SUPER_SECRET || "";
  const verify = jwt.verify(accessToken, secret);
  if (!verify) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }
  req.userId = verify.sub;
  return next();
}
