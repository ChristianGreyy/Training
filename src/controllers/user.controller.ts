import { Request, Response } from "express";
import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(StatusCodes.CREATED).send(user);
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  res.send(result);
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.userId);
  res.status(StatusCodes.NO_CONTENT).send();
});

const rentBook = catchAsync(async (req: Request, res: Response) => {
  await userService.rentBook(req.params.bookId, req.params.userId, req.body);
  return res.status(StatusCodes.CREATED).json({
    message: "Rent book successfully",
  });
});

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  rentBook,
};
