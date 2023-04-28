"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Projects.init(
    {
      user_id: {
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
      role: DataTypes.ENUM("leader", "developer", "tester", "designer"),
    },
    {
      sequelize,
      modelName: "User_Projects",
    }
  );

  return User_Projects;
};
