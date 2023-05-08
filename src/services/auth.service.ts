import CreateUserDto from "../dtos/user/create-user.dto";
import UpdateUserDto from "../dtos/user/update-user.dto";
import * as crypto from "crypto-js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import RegisterDto from "../dtos/auth/register.dto";
import LoginDto from "../dtos/auth/login.dto";
import tokenService from "./token.service";
import validation from "../middlewares/validation";
import CreateInviteDto from "../dtos/auth/create-invite.dto";
import IUser from "../interfaces/user.interface";
import moment from "moment";
import { Op } from "sequelize";
import projectService from "./project.service";
import VerifyCodeDto from "../dtos/auth/verify-code.dto";
const db = require("../models/index.js");

class AuthService {
  async login(loginDto: LoginDto) {
    const error = await validation(LoginDto, loginDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const user: any = await db.User.findOne({
      where: { user_name: loginDto.user_name },
    });
    if (!user) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        "User or password is incorrect"
      );
    }

    const isPassword = await bcrypt.compare(loginDto.pass_word, user.pass_word);
    if (!isPassword) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        "Username or password is incorrect"
      );
    }

    if (user.dataValues.status == "inactive") {
      throw new HttpException(StatusCodes.UNAUTHORIZED, "Account is inactive");
    }

    return await tokenService.generateAuthTokens(user);
  }

  async register(registerDto: RegisterDto): Promise<IUser> {
    const error = await validation(RegisterDto, registerDto);
    if (error) {
      console.log(error);
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }

    // user
    // Check code exists ?
    const codeDoc = await tokenService.verifyVerifyCode(registerDto.code);
    await db.Token.destroy({
      where: {
        id: codeDoc.id,
      },
    });

    // Check user exists ?
    const user: any = await db.User.findOne({
      where: { user_name: registerDto.user_name },
    });
    if (user) {
      throw new HttpException(StatusCodes.CONFLICT, "User already exists");
    }

    // Save user
    const role = await db.Role.findOne({
      where: {
        name: "user",
      },
    });

    registerDto["role_id"] = role.id;
    registerDto["code"] = null;

    const newUser = await userService.createUser(registerDto, null);
    // // Decode code
    // var bytes = crypto.AES.decrypt(registerDto.code, secret);
    // var decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    return newUser;
  }

  async createInvite(createInviteDto: CreateInviteDto): Promise<string> {
    const error = await validation(CreateInviteDto, createInviteDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const expire = moment().add(7, "days");
    const secret: string = process.env.SUPER_SECRET || "";
    const token = crypto.AES.encrypt(
      JSON.stringify(createInviteDto),
      secret
    ).toString();
    await tokenService.saveToken(
      token,
      createInviteDto.user_id,
      expire,
      "invite"
    );

    return token;
  }

  async verifyInvite(verifyCodeDto: VerifyCodeDto): Promise<string> {
    const error = await validation(VerifyCodeDto, verifyCodeDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const user = await db.User.findOne({
      where: {
        code: verifyCodeDto.code,
      },
    });
    console.log(user);
    if (!user) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Code is invalid");
    }
    user.code = null;
    return await user.save();
  }
}

export default new AuthService();
