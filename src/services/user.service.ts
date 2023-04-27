import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import HttpException from "../configs/HttpException";
import CreateUserDto from "../dtos/user/create-user.dto";
import UpdateUserDto from "../dtos/user/update-user.dto";
import IUser from "../interfaces/user.interface";
const db = require("../models/index.js");

class UserService {
  async getUsers(): Promise<IUser[]> {
    return await db.User.findAll();
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await db.User.findByPk(userId);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const password: string = createUserDto.pass_word;
    const hashedPassword: string = await bcrypt.hash(password, 7);
    createUserDto["pass_word"] = hashedPassword;

    return await db.User.create(createUserDto);
  }

  async updateUserById(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>
  ): Promise<IUser> {
    const user = await this.getUserById(userId);
    console.log(user);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return await db.User.update(updateUserDto, {
      where: {
        id: userId,
      },
    });
  }

  async deleteUserById(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return await db.User.destroy({
      where: {
        id: userId,
      },
    });
  }
}

export default new UserService();
