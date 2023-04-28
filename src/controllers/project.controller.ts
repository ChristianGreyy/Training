import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { projectService } from "../services";

class ProjectController {
  private projectService = projectService;
  async getProjects(req: any, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getProjects(req.query);
      return res.status(StatusCodes.OK).json({
        projects,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectService.getProjectById(req.params.projectId);
      if (!project) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Project not found");
      }
      return res.status(StatusCodes.OK).json({
        project,
      });
    } catch (err) {
      next(err);
    }
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.createProject(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create project successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.updateProjectById(req.params.projectId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update project successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.deleteProjectById(req.params.projectId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete project successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async restoreProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.restoreProjectById(req.params.projectId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Restore project successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProjectController();
