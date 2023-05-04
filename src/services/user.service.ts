import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import HttpException from "../configs/HttpException";
import CreateUserDto from "../dtos/user/create-user.dto";
import UpdateUserDto from "../dtos/user/update-user.dto";
import IUser from "../interfaces/user.interface";
import validation from "../middlewares/validation";
import paginatePlugin from "../models/plugins/paginate.plugin";
import pick from "../utils/pick";
import QueryDto from "../dtos/query.dto";
const db = require("../models/index.js");

class UserService {
  async getUsers(queryDto: QueryDto): Promise<any> {
    const filter = pick(queryDto, ["id", "user_name", "gender", "status"]);
    const options = pick(queryDto, ["sortBy", "limit", "page", "populate"]);
    const userQuery = await paginatePlugin(db.User, filter, options);
    return userQuery;
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await db.User.findByPk(userId);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const error = await validation(CreateUserDto, createUserDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const password: string = createUserDto.pass_word;
    const hashedPassword: string = await bcrypt.hash(password, 7);
    createUserDto["pass_word"] = hashedPassword;

    return await db.User.create(createUserDto);
  }

  async updateUserById(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<IUser> {
    const error = await validation(UpdateUserDto, updateUserDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const user = await this.getUserById(userId);
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
