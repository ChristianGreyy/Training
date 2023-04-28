import CreatePriorityDto from "../dtos/priority/create-priority.dto";
import UpdatePriorityDto from "../dtos/priority/update-priority.dto";
import { StatusCodes, TOO_MANY_REQUESTS } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Op, Sequelize } from "sequelize";
import IPriority from "../interfaces/priority.dto";
import PriorityQuery from "../dtos/priority/priority-query.dto";
const db = require("../models/index.js");

class PriorityService {
  async getPriorities(priorityQuery: PriorityQuery): Promise<IPriority[]> {
    if (priorityQuery.deleteFlag == "true") {
      return await db.Priority.findAll({
        where: { deletedAt: { [Op.not]: null } },
        paranoid: false,
      });
    }
    return await db.Priority.findAll();
  }

  async getPriorityById(priorityId: string): Promise<IPriority> {
    const priority = await db.Priority.findByPk(priorityId);
    return priority;
  }

  async createPriority(
    createPriorityDto: Partial<CreatePriorityDto>
  ): Promise<IPriority> {
    return await db.Priority.create(createPriorityDto);
  }

  async updatePriorityById(
    priorityId: string,
    updatePriorityDto: Partial<UpdatePriorityDto>
  ): Promise<void> {
    const priority = await this.getPriorityById(priorityId);
    if (!priority) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Priority not found");
    }
    return await db.Priority.update(updatePriorityDto, {
      where: {
        id: priorityId,
      },
    });
  }

  async deletePriorityById(priorityId: string): Promise<void> {
    const priority = await this.getPriorityById(priorityId);
    if (!priority) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Priority not found");
    }
    return await db.Priority.destroy({
      where: {
        id: priorityId,
      },
    });
  }

  async restorePriorityById(typeId: string): Promise<void> {
    const type = await db.Priority.findOne({
      where: { id: typeId, deletedAt: { [Op.not]: null } },
      paranoid: false,
    });
    if (!type) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Priority not found");
    }
    return await db.Priority.restore();
  }
}

export default new PriorityService();
