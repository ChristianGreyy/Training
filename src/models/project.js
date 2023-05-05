"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  Project.associate = (models) => {
    models.Project.belongsToMany(models.User, {
      through: models.User_Projects,
      foreignKey: "project_id",
      as: "members",
      otherKey: "user_id",
    });

    models.Project.hasMany(models.Task, {
      foreignKey: "project_id",
      as: "tasks",
    });
  };

  return Project;
};
