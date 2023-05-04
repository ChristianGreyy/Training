"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Type.init(
    {
      name: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type",
      paranoid: true, // enable soft deletion
    }
  );

  Type.associate = (models) => {
    models.Type.hasMany(models.Task, {
      foreignKey: "type_id",
    });
  };

  return Type;
};
