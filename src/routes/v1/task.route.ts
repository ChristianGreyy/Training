import express from "express";
import { taskController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/").get(taskController.getTasks).post(taskController.createTask);

router
  .route("/:taskId")
  .get(taskController.getTaskById)
  .put(taskController.updateTaskById)
  .delete(auth, taskController.deleteTaskById);

export default router;
