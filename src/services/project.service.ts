import CreateProjectDto from "../dtos/project/create-project.dto";
import UpdateProjectDto from "../dtos/project/update-project.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Op, Sequelize } from "sequelize";
import IProject from "../interfaces/project.interface";
import ProjectQuery from "../dtos/project/project-query.dto";
const db = require("../models/index.js");

class ProjectService {
  async getProjects(projectQuery: ProjectQuery): Promise<IProject[]> {
    return await db.Project.findAll();
  }

  async getProjectById(projectId: string): Promise<IProject> {
    const project = await db.Project.findByPk(projectId);
    return project;
  }

  async createProject(
    createProjectDto: Partial<CreateProjectDto>
  ): Promise<IProject> {
    return await db.Project.create(createProjectDto);
  }

  async updateProjectById(
    projectId: string,
    updateProjectDto: Partial<UpdateProjectDto>
  ): Promise<void> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Project not found");
    }
    return await db.Project.update(updateProjectDto, {
      where: {
        id: projectId,
      },
    });
  }

  async deleteProjectById(projectId: string): Promise<void> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Project not found");
    }
    return await db.Project.destroy({
      where: {
        id: projectId,
      },
    });
  }

  async restoreProjectById(projectId: string): Promise<void> {
    const project = await db.Project.findOne({
      where: { id: projectId, deletedAt: { [Op.not]: null } },
      paranoid: false,
    });
    if (!project) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Project not found");
    }
    return await db.Project.restore();
  }
}

export default new ProjectService();
