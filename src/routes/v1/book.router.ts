import express from "express";
import { bookController } from "../../controllers";

const router = express.Router();

router.route("/").get(bookController.getBooks).post(bookController.createBook);

router.get("/outdated", bookController.getOutdatedBooks);
router.get("/rent/:userId", bookController.getBookByUserId);

router
  .route("/:bookId")
  .get(bookController.getBookById)
  .put(bookController.updateBookById)
  .delete(bookController.deleteBookById);

router.route("/:bookId/:userId").post(bookController.rentBook);

export default router;
