"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Status.init(
    {
      name: DataTypes.STRING,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Status",
      paranoid: true, // enable soft deletion
    }
  );

  Status.associate = (models) => {
    models.Status.hasMany(models.Task, {
      foreignKey: "status_id",
      as: "status",
    });
  };

  return Status;
};
