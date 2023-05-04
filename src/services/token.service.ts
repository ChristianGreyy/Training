import moment from "moment";
import jwt from "jsonwebtoken";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
const db = require("../models");

class AuthService {
  async generateToken(
    userId: string,
    expires: any,
    type: string,
    secret: string
  ) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  }

  async saveToken(
    token: string,
    userId: string,
    expires: any,
    type: string,
    blacklisted: boolean = false
  ) {
    const tokenDoc = await db.Token.create({
      token,
      userId: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  }

  async generateAuthTokens(user: any) {
    const secret: string = process.env.SUPER_SECRET || "";
    const accessTokenExpires = moment().add(7, "days");
    const accessToken = await this.generateToken(
      user.id,
      accessTokenExpires,
      "access",
      secret
    );

    const refreshTokenExpires = moment().add(30, "days");
    const refreshToken = await this.generateToken(
      user.id,
      refreshTokenExpires,
      "refresh",
      secret
    );

    await this.saveToken(refreshToken, user.id, refreshTokenExpires, "refresh");

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async generateAcessTokens(user: any) {
    const secret: string = process.env.SUPER_SECRET || "";
    const accessTokenExpires = moment().add(30, "minutes");
    const accessToken = await this.generateToken(
      user.id,
      accessTokenExpires,
      "access",
      secret
    );
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
    };
  }

  async verifyToken(token: string, type: string) {
    const secret: string = process.env.SUPER_SECRET || "";
    const payload = jwt.verify(token, secret);
    const tokenDoc = await db.Token.findOne({
      where: {
        token,
        type,
        userId: payload.sub,
        blacklisted: false,
      },
    });
    if (!tokenDoc) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        "Refresh token not found"
      );
    }
    return tokenDoc;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const refreshTokenDoc = await this.verifyToken(refreshToken, "refresh");
      const user = await userService.getUserById(refreshTokenDoc.userId);
      if (!user) {
        throw new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized");
      }
      await db.Token.destroy({
        where: {
          id: refreshTokenDoc.id,
        },
      });

      return this.generateAcessTokens(user);
    } catch (error: any) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }
}

export default new AuthService();
