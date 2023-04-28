import CreateTaskDto from "../dtos/task/create-task.dto";
import UpdateTaskDto from "../dtos/task/update-task.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Op, Sequelize } from "sequelize";
import ITask from "../interfaces/task.interface";
import TaskQuery from "../dtos/task/task-query-dto";
const db = require("../models/index.js");

class TaskService {
  async getTasks(taskQuery: TaskQuery): Promise<ITask[]> {
    return await db.Task.findAll();
  }

  async getTaskById(taskId: string): Promise<ITask> {
    const task = await db.Task.findByPk(taskId);
    return task;
  }

  async createTask(createTaskDto: Partial<CreateTaskDto>): Promise<ITask> {
    return await db.Task.create(createTaskDto);
  }

  async updateTaskById(
    taskId: string,
    updateTaskDto: Partial<UpdateTaskDto>
  ): Promise<void> {
    const task = await this.getTaskById(taskId);
    if (!task) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Task not found");
    }
    return await db.Task.update(updateTaskDto, {
      where: {
        id: taskId,
      },
    });
  }

  async deleteTaskById(taskId: string): Promise<void> {
    const task = await this.getTaskById(taskId);
    if (!task) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Task not found");
    }
    return await db.Task.destroy({
      where: {
        id: taskId,
      },
    });
  }
}

export default new TaskService();
