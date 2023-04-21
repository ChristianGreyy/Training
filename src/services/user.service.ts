import CreateUserDto from "../dtos/user/create-user.dto";
import UpdateUserDto from "../dtos/user/update-user.dto";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";

class UserService {
  async getUsers() {
    return await User.findAll();
  }

  async getUserById(userId: string) {
    const user = await User.findByPk(userId);
    return user;
  }

  async createUser(createUserDto: Partial<CreateUserDto>) {
    return await User.create(createUserDto);
  }

  async updateUserById(userId: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.getUserById(userId);
    console.log(user);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return await User.update(updateUserDto, {
      where: {
        id: userId,
      },
    });
  }

  async deleteUserById(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return await User.destroy({
      where: {
        id: userId,
      },
    });
  }
}

export default new UserService();
