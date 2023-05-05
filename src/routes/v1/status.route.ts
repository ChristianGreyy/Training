import express from "express";
import { statusController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(auth(["admin", "user"]), statusController.getStatuses)
  .post(auth(["admin"]), statusController.createStatus);

router.put(
  "/restore/:statusId",
  auth(["user"]),
  statusController.restoreStatusById
);

router
  .route("/:statusId")
  .get(auth(["admin"]), statusController.getStatusById)
  .put(auth(["admin"]), statusController.updateStatusById)
  .delete(auth(["admin"]), statusController.deleteStatusById);

export default router;
