import { Request, Response } from "express";
import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";

const login = catchAsync(async (req: Request, res: Response) => {
  const token = await authService.login(req.body);
  return res.status(StatusCodes.CREATED).json({
    message: "Login successfully",
    token,
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  await authService.register(req.body);
  return res.status(StatusCodes.CREATED).json({
    message: "Register successfully",
  });
});

const resetToken = catchAsync(async (req: Request, res: Response) => {
  const token = await tokenService.refreshAuth(req.body.refreshToken);
  return res.status(StatusCodes.CREATED).json({
    token,
  });
});

export { login };
