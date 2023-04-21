import { Sequelize, DataTypes } from "sequelize";
// const { Sequelize, DataTypes } = require("sequelize");

import db from "./index";
import User from "./user.model";

const Book = db.sequelize.define(
  "Book",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("action", "love", "knowledge", "detective"),
      defaultValue: "action",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outdated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Book.belongsToMany(User, { through: "User_Books" });

// (async () => {
//   await Book.sync({ force: true });
// })();

export default Book;
