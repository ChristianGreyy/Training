import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { roleService } from "../services";

class RoleController {
  private roleService = roleService;
  async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await roleService.getRoles();
      return res.status(StatusCodes.OK).json({
        roles,
      });
    } catch (err) {
      next(err);
    }
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.getRoleById(req.params.roleId);
      if (!role) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Role not found");
      }
      return res.status(StatusCodes.OK).json({
        role,
      });
    } catch (err) {
      next(err);
    }
  }

  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      await roleService.createRole(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create role successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      await roleService.updateRoleById(req.params.roleId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update role successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      await roleService.deleteRoleById(req.params.roleId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete role successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new RoleController();
