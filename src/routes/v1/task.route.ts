import express from "express";
import { taskController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/personal", auth(["user"]), taskController.getPersonalTasks);

router
  .route("/")
  .get(auth(["admin", "user"]), taskController.getTasks)
  .post(auth(["admin", "user"]), taskController.createTask);

router
  .route("/:taskId")
  .get(auth(["admin"]), taskController.getTaskById)
  .put(auth(["user", "admin"]), taskController.updateTaskById)
  .delete(auth(["admin"]), taskController.deleteTaskById);

export default router;
