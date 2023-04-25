import express from "express";
import { bookController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/").get(bookController.getBooks).post(bookController.createBook);

router.get("/outdated", bookController.getOutdatedBooks);
router.get("/rent/:userId", bookController.getBooksByUserId);
router.get("/rent", auth, bookController.getBooksByRenter);

router
  .route("/:bookId")
  .get(bookController.getBookById)
  .put(auth, bookController.updateBookById)
  .delete(auth, bookController.deleteBookById);

export default router;
