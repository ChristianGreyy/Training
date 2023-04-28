import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { priorityService } from "../services";

class PriorityController {
  private priorityService = priorityService;
  async getPriorities(req: any, res: Response, next: NextFunction) {
    try {
      const prioritys = await priorityService.getPriorities(req.query);
      return res.status(StatusCodes.OK).json({
        prioritys,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPriorityById(req: Request, res: Response, next: NextFunction) {
    try {
      const priority = await priorityService.getPriorityById(
        req.params.priorityId
      );
      if (!priority) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Priority not found");
      }
      return res.status(StatusCodes.OK).json({
        priority,
      });
    } catch (err) {
      next(err);
    }
  }

  async createPriority(req: Request, res: Response, next: NextFunction) {
    try {
      await priorityService.createPriority(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create priority successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updatePriorityById(req: Request, res: Response, next: NextFunction) {
    try {
      await priorityService.updatePriorityById(req.params.priorityId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update priority successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deletePriorityById(req: Request, res: Response, next: NextFunction) {
    try {
      await priorityService.deletePriorityById(req.params.priorityId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete priority successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async restorePriorityById(req: Request, res: Response, next: NextFunction) {
    try {
      await priorityService.restorePriorityById(req.params.priorityId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Restore priority successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new PriorityController();
