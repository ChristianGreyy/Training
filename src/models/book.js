"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      category: DataTypes.ENUM("action", "love", "knowledge", "detective"),
      description: DataTypes.STRING,
      outdated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );

  Book.associate = (models) => {
    models.Book.belongsToMany(models.User, {
      through: models.UserBook,
      foreignKey: "bookId",
      otherKey: "userId",
    });
  };

  return Book;
};
