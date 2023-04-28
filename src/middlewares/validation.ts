import { validate, validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Response } from "express";
import pick from "../utils/pick";
import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";

export default async function (dto: any, body: any): Promise<any> {
  //   const body: any = pick(req.body, ["user_name", "pass_word"]);
  let instanceBody = plainToInstance(dto, body); // to convert user plain object a single user. also supports arrays

  try {
    await validateOrReject(instanceBody);
  } catch (errors: any) {
    const constraints = errors.map((error: any) => {
      return error.constraints;
    });
    return constraints;
  }

  //   await validate(instanceBody).then((errors) => {
  //     // errors is an array of validation errors
  //     if (errors.length > 0) {
  //       const constraints = errors.map((error: any) => {
  //         return error.constraints;
  //       });
  //       console.log(constraints);
  //       return constraints;
  //     } else {
  //       console.log("validation succeed");
  //       return null;
  //     }
  //   });
}
