import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { taskService } from "../services";

class TaskController {
  private taskService = taskService;
  async getTasks(req: any, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getTasks(req.query);
      return res.status(StatusCodes.OK).json({
        tasks,
      });
    } catch (err) {
      next(err);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.getTaskById(req.params.taskId);
      if (!task) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Task not found");
      }
      return res.status(StatusCodes.OK).json({
        task,
      });
    } catch (err) {
      next(err);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      await taskService.createTask(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create task successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      await taskService.updateTaskById(req.params.taskId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update task successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      await taskService.deleteTaskById(req.params.taskId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete task successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TaskController();
