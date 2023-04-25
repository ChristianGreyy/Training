import express from "express";
import { userController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:userId")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(auth, userController.deleteUserById);

router.route("/:userId/rent/:bookId").post(userController.rentBook);
export default router;
