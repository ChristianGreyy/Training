import express from "express";
import { userController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(auth(["admin"]), userController.getUsers)
  .post(auth(["user", "admin"]), userController.createUser);

router
  .route("/:userId")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(auth(["admin"]), userController.deleteUserById);

export default router;
