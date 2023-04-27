import express from "express";
import { statusController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(statusController.getStatuses)
  .post(statusController.createStatus);

router
  .route("/:statusId")
  .get(statusController.getStatusById)
  .put(statusController.updateStatusById)
  .delete(statusController.deleteStatusById);

export default router;
