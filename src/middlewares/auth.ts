import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { userService } from "../services";
const db = require("../models/index.js");

export default function (roles: any) {
  return async function (req: any, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    // console.log(token);
    if (!token) {
      return next(new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized"));
    }
    const accessToken = token.split(" ")[1];
    const secret: string = process.env.SUPER_SECRET || "";
    const verify = jwt.verify(accessToken, secret);
    if (!verify) {
      return next(new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized"));
    }
    const user = await db.User.findByPk(verify.sub, {
      include: [
        {
          model: db.Role,
        },
      ],
    });
    if (!user) {
      return next(new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized"));
    }
    const role = user.Role.name;
    // console.log(role);
    const checkRole = roles.includes(role);
    if (!checkRole) {
      return next(new HttpException(StatusCodes.FORBIDDEN, "Forbidden"));
    }
    req.user = user;

    return next();
  };
}
