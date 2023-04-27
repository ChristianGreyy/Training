import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { typeService } from "../services";

class TypeController {
  private typeService = typeService;
  async getTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await typeService.getTypes();
      return res.status(StatusCodes.OK).json({
        types,
      });
    } catch (err) {
      next(err);
    }
  }

  async getTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      const type = await typeService.getTypeById(req.params.typeId);
      if (!type) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Type not found");
      }
      return res.status(StatusCodes.OK).json({
        type,
      });
    } catch (err) {
      next(err);
    }
  }

  async createType(req: Request, res: Response, next: NextFunction) {
    try {
      await typeService.createType(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create type successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      await typeService.updateTypeById(req.params.typeId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update type successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      await typeService.deleteTypeById(req.params.typeId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete type successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async restoreTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      await typeService.restoreTypeById(req.params.typeId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Restore type successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TypeController();
