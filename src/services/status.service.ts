import CreateStatusDto from "../dtos/status/create-status.dto";
import UpdateStatusDto from "../dtos/status/update-status.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { Op, Sequelize } from "sequelize";
import IStatus from "../interfaces/status.interface";
const db = require("../models/index.js");

class StatusService {
  async getStatuses(): Promise<IStatus[]> {
    return await db.Status.findAll({
      where: { deletedAt: { [Op.not]: null } },
      paranoid: false,
    });

    return await db.Status.findAll();
  }

  async getStatusById(statusId: string): Promise<IStatus> {
    const status = await db.Status.findByPk(statusId);
    return status;
  }

  async createStatus(
    createStatusDto: Partial<CreateStatusDto>
  ): Promise<IStatus> {
    return await db.Status.create(createStatusDto);
  }

  async updateStatusById(
    statusId: string,
    updateStatusDto: Partial<UpdateStatusDto>
  ): Promise<void> {
    const status = await this.getStatusById(statusId);
    if (!status) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Status not found");
    }
    return await db.Status.update(updateStatusDto, {
      where: {
        id: statusId,
      },
    });
  }

  async deleteStatusById(statusId: string): Promise<void> {
    const status = await this.getStatusById(statusId);
    if (!status) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Status not found");
    }
    return await db.Status.destroy({
      where: {
        id: statusId,
      },
    });
  }
}

export default new StatusService();
