export default {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "230502",
  DB: "training",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
