import { Op, Sequelize } from "sequelize";
import slugify from "slugify";
import CreateProjectDto from "../dtos/project/create-project.dto";
import UpdateProjectDto from "../dtos/project/update-project.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import IProject from "../interfaces/project.interface";
import validation from "../middlewares/validation";
import QueryDto from "../dtos/query.dto";
import paginatePlugin from "../models/plugins/paginate.plugin";
import pick from "../utils/pick";
import SolveMemberProjectDto from "../dtos/project/solve-member-project.dto";
const db = require("../models/index.js");

class ProjectService {
  async getPersonalProjects(user_id: number): Promise<IProject> {
    const projects = await db.Project.findAll({
      include: [
        {
          model: db.User,
          where: { id: user_id },
          include: [
            {
              model: db.Task,
            },
          ],
        },
      ],
    });
    return projects;
  }

  async getProjects(queryDto: QueryDto): Promise<any> {
    const filter = pick(queryDto, ["id", "slug"]);
    const options = pick(queryDto, ["sortBy", "limit", "page", "populate"]);
    const projectQuery = await paginatePlugin(db.Project, filter, options);

    projectQuery.results = projectQuery.results.map((project: any) => {
      project.dataValues["task_total"] = project.Tasks.length;
      project.dataValues["completed_tasks"] = project.Tasks.filter(
        (task: any) => task.Status.name == "Resolved"
      ).length;
      return project;
    });
    return projectQuery;
  }

  async getProjectById(projectId: string): Promise<any> {
    const project = await db.Project.findByPk(projectId);
    return project;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    const error = await validation(CreateProjectDto, createProjectDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    createProjectDto["slug"] = slugify(createProjectDto["name"], "_");
    return await db.Project.create(createProjectDto);
  }

  async updateProjectById(
    projectId: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<void> {
    const error = await validation(UpdateProjectDto, updateProjectDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
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

  async solveMembersToProject(
    projectId: string,
    solveMembersToProject: SolveMemberProjectDto
  ): Promise<void> {
    const error = await validation(
      SolveMemberProjectDto,
      solveMembersToProject
    );
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }

    let project = await this.getProjectById(projectId);
    if (!project) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Project not found");
    }

    const status = solveMembersToProject.status;
    const usersId = solveMembersToProject.members.map(
      (member: any) => member.user_id
    );
    const users = await db.User.findAll({
      where: { id: usersId },
    });

    if (status == "add") {
      return await project.addUsers(users);
    } else if (status == "delete") {
      return await project.removeUsers(users);
    }
  }
}

export default new ProjectService();
