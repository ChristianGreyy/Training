import { Sequelize } from "sequelize";
import dbConfig from "../configs/database";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  //   dialect: dbConfig.dialect,
  dialect: "postgres",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

(async () => {
  await sequelize.sync();
})();

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

export default db;
