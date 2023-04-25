import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import apiRoutes from "./routes/v1";
import globalError from "./middlewares/globalError";
const app = express();
const port = 8080;
// console.log(process.env.SUPER_SECRET);

app.use(express.json());
app.use("/api/v1", apiRoutes);

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/Training");
    console.log("Connect database successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use(globalError);

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
