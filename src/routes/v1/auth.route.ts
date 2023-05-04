import express from "express";
import { authController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/resetToken", authController.resetToken);
router.post(
  "/create-invite",
  auth(["admin", "user"]),
  authController.createInvite
);

export default router;
