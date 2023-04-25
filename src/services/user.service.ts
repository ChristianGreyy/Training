import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/index";

const createUser = async (userBody: any) => {
  return User.create(userBody);
};

const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new HttpException(StatusCodes.NOT_FOUND, "User not found !");
  }
  await user.deleteOne({ _id: user._id });
  return user;
};

export { createUser, getUserById, updateUserById, deleteUserById };
