import express from "express";
import { typeController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/").get(typeController.getTypes).post(typeController.createType);

router.put("/restore/:typeId", typeController.restoreTypeById);

router
  .route("/:typeId")
  .get(typeController.getTypeById)
  .put(typeController.updateTypeById)
  .delete(typeController.deleteTypeById);

export default router;
