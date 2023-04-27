import CreateRoleDto from "../dtos/role/create-role.dto";
import UpdateRoleDto from "../dtos/role/update-role.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import { Sequelize } from "sequelize";
import IRole from "../interfaces/role.interface";
const db = require("../models/index.js");

class RoleService {
  async getRoles(): Promise<IRole[]> {
    return await db.Role.findAll();
  }

  async getRoleById(roleId: string): Promise<IRole> {
    const role = await db.Role.findByPk(roleId);
    return role;
  }

  async createRole(createRoleDto: Partial<CreateRoleDto>): Promise<IRole> {
    return await db.Role.create(createRoleDto);
  }

  async updateRoleById(
    roleId: string,
    updateRoleDto: Partial<UpdateRoleDto>
  ): Promise<void> {
    const role = await this.getRoleById(roleId);
    if (!role) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Role not found");
    }
    return await db.Role.update(updateRoleDto, {
      where: {
        id: roleId,
      },
    });
  }

  async deleteRoleById(roleId: string): Promise<void> {
    const role = await this.getRoleById(roleId);
    if (!role) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Role not found");
    }
    return await db.Role.destroy({
      where: {
        id: roleId,
      },
    });
  }
}

export default new RoleService();
