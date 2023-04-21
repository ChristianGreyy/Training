import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpException from "../configs/HttpException";

export default function (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("im here");
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
}
