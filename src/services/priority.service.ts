import CreatePriorityDto from "../dtos/priority/create-priority.dto";
import UpdatePriorityDto from "../dtos/priority/update-priority.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Sequelize } from "sequelize";
import IPriority from "../interfaces/priority.dto";
const db = require("../models/index.js");

class PriorityService {
  async getPriorities(): Promise<IPriority[]> {
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
}

export default new PriorityService();
