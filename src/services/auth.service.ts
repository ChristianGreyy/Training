import { StatusCodes } from "http-status-codes";
import LoginDto from "../dtos/auth/login.dto";
import { User } from "../models";
import HttpException from "../configs/HttpException";
import tokenService from "./token.service";
import RegisterDto from "../dtos/auth/register.dto";
import userService from "./user.service";

class AuthSerivce {
  async login(loginDto: Partial<LoginDto>) {
    const user: any = await User.findOne({
      user_name: loginDto.user_name,
    });
    if (!user || user.pass_word !== loginDto.pass_word) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Login failed");
    }
    return await tokenService.generateAuthTokens(user);
  }

  async register(registerDto: Partial<RegisterDto>) {
    const user: any = await User.findOne({
      user_name: registerDto.user_name,
    });
    if (user) {
      throw new HttpException(StatusCodes.CONFLICT, "User already exists");
    }
    return await userService.createUser(registerDto);
  }
}

export default new AuthSerivce();
