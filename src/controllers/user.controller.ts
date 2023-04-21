import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { userService } from "../services";

class UserController {
  private userService = userService;
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      return res.status(StatusCodes.OK).json({
        users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.userId);
      if (!user) {
        throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
      }
      return res.status(StatusCodes.OK).json({
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.createUser(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create user successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.updateUserById(req.params.userId, req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Update user successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUserById(req.params.userId);
      return res.status(StatusCodes.CREATED).json({
        message: "Delete user successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
