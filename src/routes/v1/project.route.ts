import express from "express";
import { projectController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(projectController.getProjects)
  .post(projectController.createProject);

router
  .route("/:projectId")
  .get(projectController.getProjectById)
  .put(projectController.updateProjectById)
  .delete(auth, projectController.deleteProjectById);

export default router;
