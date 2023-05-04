import express from "express";
import { projectController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/personal", auth(["user"]), projectController.getPersonalProjects);

router
  .route("/")
  .get(auth(["admin"]), projectController.getProjects)
  .post(auth(["admin"]), projectController.createProject);

router.patch("/:projectId/members", projectController.solveMembersToProject);

router
  .route("/:projectId")
  .get(auth(["admin"]), projectController.getProjectById)
  .put(auth(["admin"]), projectController.updateProjectById)
  .delete(auth(["admin"]), projectController.deleteProjectById);

export default router;
