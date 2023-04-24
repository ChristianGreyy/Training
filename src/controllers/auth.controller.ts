import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import authService from "../services/auth.service";

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await authService.login(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Login successfully",
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Register successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
