import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { statusService } from "../services";

class StatusController {
  private statusService = statusService;
  async getStatuses(req: Request, res: Response, next: NextFunction) {
    try {
      const statuses = await statusService.getStatuses();
      return res.status(StatusCodes.OK).json({
        statuses,
      });
    } catch (err) {
      next(err);
    }
  }

  async getStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await statusService.getStatusById(req.params.statusId);
      if (!status) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Status not found");
      }
      return res.status(StatusCodes.OK).json({
        status,
      });
    } catch (err) {
      next(err);
    }
  }

  async createStatus(req: Request, res: Response, next: NextFunction) {
    try {
      await statusService.createStatus(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create status successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      await statusService.updateStatusById(req.params.statusId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update status successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      await statusService.deleteStatusById(req.params.statusId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete status successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new StatusController();
