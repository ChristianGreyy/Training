import express from "express";
import { priorityController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(auth(["admin", "user"]), priorityController.getPriorities)
  .post(auth(["admin"]), priorityController.createPriority);

router.put(
  "/restore/:priorityId",
  auth(["admin"]),
  priorityController.restorePriorityById
);

router
  .route("/:priorityId")
  .get(auth(["admin"]), priorityController.getPriorityById)
  .put(auth(["admin"]), priorityController.updatePriorityById)
  .delete(auth(["admin"]), priorityController.deletePriorityById);

export default router;
