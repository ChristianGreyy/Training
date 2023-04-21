import express from "express";
import apiRoutes from "./routes/v1";
import db from "./models";
import globalError from "./middlewares/globalError";
const app = express();
const port = 8080;

app.use(express.json());
app.use("/api/v1", apiRoutes);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use(globalError);

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
