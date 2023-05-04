import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import authService from "../services/auth.service";
import tokenService from "../services/token.service";

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

  async resetToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await tokenService.refreshAccessToken(
        req.body.refreshToken
      );
      return res.status(StatusCodes.CREATED).json({
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async createInvite(req: any, res: Response, next: NextFunction) {
    try {
      const code = await authService.createInvite({
        project_id: req.body.project_id,
        user_id: req.user.id,
        role: req.body.role,
      });
      return res.status(StatusCodes.CREATED).json({
        code,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();
