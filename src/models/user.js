"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      user_name: DataTypes.STRING,
      pass_word: DataTypes.STRING,
      gender: DataTypes.ENUM("female", "male"),
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birthday: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    models.User.belongsTo(models.Role, {
      foreignKey: "role_id",
    });

    models.User.hasMany(models.Task, {
      foreignKey: "creator_id",
    });

    models.User.hasMany(models.Task, {
      foreignKey: "assignee_id",
    });

    models.User.hasMany(models.Token, {
      foreignKey: "user_id",
    });

    models.User.belongsToMany(models.Project, {
      through: models.User_Projects,
      foreignKey: "user_id",
      otherKey: "project_id",
    });
  };

  return User;
};
