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
      user_name: DataTypes.STRING,
      pass_word: DataTypes.STRING,
      gender: DataTypes.ENUM("famale", "male"),
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      latest_rent_day: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    models.User.belongsToMany(models.Book, {
      through: models.UserBook,
      foreignKey: "userId",
      otherKey: "bookId",
    });

    models.User.hasMany(models.Token, {
      foreignKey: "userId",
    });
  };

  return User;
};

// UserBook.associate = (models) => {
//   UserBook.belongsTo(models.User, { foreignKey: "userId" });
//   UserBook.belongsTo(models.Book, { foreignKey: "bookId" });
// };

// Token.associate = (models) => {
//   models.Token.belongsTo(models.User, {
//     foreignKey: "userId",
//   });
// };
