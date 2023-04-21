import { Sequelize, DataTypes } from "sequelize";
import Book from "./book.model";
// const { Sequelize, DataTypes } = require("sequelize");

import db from "./index";

const User = db.sequelize.define(
  "User",
  {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass_word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("famale", "male"),
      defaultValue: "male",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

const UserBooks = db.sequelize.define(
  "User_Books",
  {
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
User.belongsToMany(Book, { through: "User_Books" });
Book.belongsToMany(User, { through: "User_Books" });

export default User;
