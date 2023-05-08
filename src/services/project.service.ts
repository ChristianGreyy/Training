import { Op, Sequelize } from "sequelize";
import { createClient } from "redis";
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
import client from "../configs/redis";
const db = require("../models/index.js");

class ProjectService {
  async getPersonalProjects(user_id: number): Promise<IProject> {
    const personalProjects = await db.Project.findAll({
      include: [
        {
          model: db.User,
          as: "members",
          where: {
            id: user_id,
          },
        },
      ],
    });

    const personalProjectsId = personalProjects.map(
      (personalProject: any) => personalProject.dataValues.id
    );

    let projects;

    await client.connect();
    // const cachedProjects = await client.hGetAll(`mt:projects:user:${user_id}`);

    const cachedProjectsJSON = await client.SMEMBERS(
      `mt:projects:users:${user_id}`
    );

    const cachedProjects = cachedProjectsJSON.map((project: any) =>
      JSON.parse(project)
    );

    console.log(cachedProjects);

    if (Object.keys(cachedProjects).length === 0) {
      projects = await db.Project.findAll({
        where: {
          id: personalProjectsId,
        },
        include: [
          {
            model: db.User,
            as: "members",
          },
          {
            model: db.Task,
            as: "tasks",
            include: [
              {
                model: db.User,
                as: "creator",
                where: {
                  id: user_id,
                },
              },
              {
                model: db.Type,
                as: "type",
              },
              {
                model: db.Status,
                as: "status",
              },
              {
                model: db.Priority,
                as: "priority",
                order: [["order", "DESC"]],
              },
            ],
            order: [[{ model: db.Priority }, "order", "DESC"]],
          },
        ],
      });

      for (let key in projects.dataValues) {
        if (projects.dataValues[key] instanceof Date) {
          projects.dataValues[key] = projects.dataValues[key].toISOString();
        } else {
          projects.dataValues[key] = projects.dataValues[key].toString();
        }
      }

      await client.SADD(
        `mt:projects:users:${user_id}`,
        ...projects.map((project: any) => JSON.stringify(project))
      );
    } else {
      projects = cachedProjects;
    }

    await client.disconnect();

    return projects;
  }

  async getProjects(queryDto: QueryDto): Promise<any> {
    const filter = pick(queryDto, ["id", "slug"]);
    const options = pick(queryDto, ["sortBy", "limit", "page", "populate"]);
    const projectQuery = await paginatePlugin(db.Project, filter, options);

    projectQuery.results = projectQuery.results.map((project: any) => {
      project.dataValues["task_total"] = project.tasks.length;
      project.dataValues["completed_tasks"] = project.tasks.filter(
        (task: any) => task.status.name == "Resolved"
      ).length;
      return project;
    });
    return projectQuery;
  }

  async getProjectById(projectId: string): Promise<any> {
    let project;
    await client.connect();
    const cachedProject = await client.hGetAll(`mt:users:${projectId}`);

    if (Object.keys(cachedProject).length === 0) {
      project = await db.Project.findByPk(projectId);

      for (let key in project.dataValues) {
        if (project.dataValues[key] instanceof Date) {
          project.dataValues[key] = project.dataValues[key].toISOString();
        } else {
          project.dataValues[key] = project.dataValues[key].toString();
        }
      }
      await client.HSET(`mt:users:${projectId}`, project.dataValues);
    } else {
      project = cachedProject;
    }
    await client.disconnect();
    return project;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    const error = await validation(CreateProjectDto, createProjectDto);
    if (error) {
      throw new HttpException(StatusCodes.MISDIRECTED_REQUEST, error);
    }
    createProjectDto["slug"] = slugify(createProjectDto["name"], "_");
    if (
      new Date(createProjectDto.start_date) >
      new Date(createProjectDto.end_date)
    ) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        "Invalid start_date or end_date"
      );
    }
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
    console.log(usersId);
    const users = await db.User.findAll({
      where: { id: usersId },
    });

    if (status == "add") {
      const userProjects = solveMembersToProject.members.map((member: any) => {
        return {
          user_id: member.user_id,
          project_id: project.id,
          role: member.role,
        };
      });
      return await db.User_Projects.bulkCreate(userProjects);
      // return await project.addMembers(users);
    } else if (status == "delete") {
      return await project.removeMembers(users);
    }
  }
}

export default new ProjectService();
