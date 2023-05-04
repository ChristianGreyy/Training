import CreateTaskDto from "../dtos/task/create-task.dto";
import UpdateTaskDto from "../dtos/task/update-task.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Op, Sequelize } from "sequelize";
import ITask from "../interfaces/task.interface";
import validation from "../middlewares/validation";
import projectService from "./project.service";
import QueryDto from "../dtos/query.dto";
import pick from "../utils/pick";
import paginatePlugin from "../models/plugins/paginate.plugin";
const db = require("../models/index.js");

class TaskService {
  async getPersonalTasks(queryDto: QueryDto): Promise<any> {
    const filter = pick(queryDto, ["id", "name"]);
    const options = pick(queryDto, ["sortBy", "limit", "page", "populate"]);
    const taskQuery = await paginatePlugin(db.Task, filter, options);
    return taskQuery;
  }

  async getTasks(queryDto: QueryDto): Promise<any> {
    const filter = pick(queryDto, ["id", "name"]);
    const options = pick(queryDto, ["sortBy", "limit", "page", "populate"]);
    const taskQuery = await paginatePlugin(db.Task, filter, options);
    return taskQuery;
  }

  async getTaskById(taskId: string): Promise<ITask> {
    const task = await db.Task.findByPk(taskId);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const error = await validation(CreateTaskDto, createTaskDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    const project = await projectService.getProjectById(
      createTaskDto.project_id.toString()
    );
    if (!project) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Project not found");
    }
    if (
      new Date(createTaskDto.start_date) > new Date(createTaskDto.end_date) ||
      new Date(createTaskDto.start_date) < new Date(project.start_date) ||
      new Date(createTaskDto.start_date) > new Date(project.end_date) ||
      new Date(createTaskDto.end_date) < new Date(project.start_date) ||
      new Date(createTaskDto.end_date) > new Date(project.end_date)
    ) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        "Invalid start_date or end_date"
      );
    }
    return await db.Task.create(createTaskDto);
  }

  async updateTaskById(
    taskId: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<void> {
    const error = await validation(UpdateTaskDto, updateTaskDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
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
