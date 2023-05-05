import express from "express";
import { typeController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(auth(["user", "admin"]), typeController.getTypes)
  .post(auth(["admin"]), typeController.createType);

router.put("/restore/:typeId", auth(["admin"]), typeController.restoreTypeById);

router
  .route("/:typeId")
  .get(auth(["admin"]), typeController.getTypeById)
  .put(auth(["admin"]), typeController.updateTypeById)
  .delete(auth(["admin"]), typeController.deleteTypeById);

export default router;
