import CreateUserDto from "../dtos/user/create-user.dto";
import UpdateUserDto from "../dtos/user/update-user.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import RegisterDto from "../dtos/auth/register.dto";
import LoginDto from "../dtos/auth/login.dto";
import tokenService from "./token.service";
const db = require("../models/index.js");

class AuthService {
  async login(loginDto: Partial<LoginDto>) {
    const user: any = await db.User.findOne({
      where: { user_name: loginDto.user_name },
    });
    if (!user || user.pass_word !== loginDto.pass_word) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Login failed");
    }
    return await tokenService.generateAuthTokens(user);
  }

  async register(registerDto: RegisterDto) {
    const user: any = await db.User.findOne({
      where: { user_name: registerDto.user_name },
    });
    if (user) {
      throw new HttpException(StatusCodes.CONFLICT, "User already exists");
    }
    return await userService.createUser(registerDto);
  }
}

export default new AuthService();
