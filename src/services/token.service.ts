import moment from "moment";
import jwt from "jsonwebtoken";

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

  //   async saveToken (token:string, userId:string, expires:any, type:string, blacklisted = false)  {
  //     const tokenDoc = await Token.create({
  //       token,
  //       user: userId,
  //       expires: expires.toDate(),
  //       type,
  //       blacklisted,
  //     });
  //     return tokenDoc;
  //   };

  async generateAuthTokens(user: any) {
    const accessTokenExpires = moment().add(30, "minutes");
    const accessToken = await this.generateToken(
      user.id,
      accessTokenExpires,
      "access",
      "supersecret"
    );

    const refreshTokenExpires = moment().add(1, "days");
    const refreshToken = await this.generateToken(
      user.id,
      refreshTokenExpires,
      "refresh",
      "supersecret"
    );
    console.log(accessToken);
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
}

export default new AuthService();
