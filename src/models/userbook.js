"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBook.init(
    {
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Books",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserBook",
    }
  );
  return UserBook;
};
