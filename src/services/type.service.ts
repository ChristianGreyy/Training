import CreateTypeDto from "../dtos/type/create-type.dto";
import UpdateTypeDto from "../dtos/type/update-type.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Op, Sequelize } from "sequelize";
import IType from "../interfaces/type.interface";
import TypeQuery from "../dtos/type/type-query.dto";
import validation from "../middlewares/validation";
const db = require("../models/index.js");

class TypeService {
  async getTypes(typeQuery: TypeQuery): Promise<IType[]> {
    if (typeQuery.deleteFlag == "true") {
      return await db.Type.findAll({
        where: { deletedAt: { [Op.not]: null } },
        paranoid: false,
      });
    }
    return await db.Type.findAll();
  }

  async getTypeById(typeId: string): Promise<IType> {
    const type = await db.Type.findByPk(typeId);
    return type;
  }

  async createType(createTypeDto: CreateTypeDto): Promise<IType> {
    const error = await validation(CreateTypeDto, createTypeDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    return await db.Type.create(createTypeDto);
  }

  async updateTypeById(
    typeId: string,
    updateTypeDto: UpdateTypeDto
  ): Promise<void> {
    const error = await validation(UpdateTypeDto, updateTypeDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const type = await this.getTypeById(typeId);
    if (!type) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Type not found");
    }
    return await db.Type.update(updateTypeDto, {
      where: {
        id: typeId,
      },
    });
  }

  async deleteTypeById(typeId: string): Promise<void> {
    const type = await this.getTypeById(typeId);
    if (!type) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Type not found");
    }
    return await db.Type.destroy({
      where: {
        id: typeId,
      },
    });
  }

  async restoreTypeById(typeId: string): Promise<void> {
    const type = await db.Type.findOne({
      where: { id: typeId, deletedAt: { [Op.not]: null } },
      paranoid: false,
    });
    if (!type) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Type not found");
    }
    return await db.Type.restore();
  }
}

export default new TypeService();
