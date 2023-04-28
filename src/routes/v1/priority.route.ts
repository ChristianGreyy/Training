import express from "express";
import { priorityController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(priorityController.getPriorities)
  .post(priorityController.createPriority);

router.put("/restore/:priorityId", priorityController.restorePriorityById);

router
  .route("/:priorityId")
  .get(priorityController.getPriorityById)
  .put(priorityController.updatePriorityById)
  .delete(priorityController.deletePriorityById);

export default router;
