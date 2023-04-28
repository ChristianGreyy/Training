"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      creator_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      assignee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Types",
          key: "id",
        },
      },
      status_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Statuses",
          key: "id",
        },
      },
      priority_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Priorities",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
