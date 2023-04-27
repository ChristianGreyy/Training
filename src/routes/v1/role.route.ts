import express from "express";
import { roleController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/").get(roleController.getRoles).post(roleController.createRole);

router
  .route("/:roleId")
  .get(roleController.getRoleById)
  .put(auth, roleController.updateRoleById)
  .delete(auth, roleController.deleteRoleById);

export default router;
