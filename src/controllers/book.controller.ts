import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import { bookService } from "../services";

class BookController {
  private bookService = bookService;
  async getBooks(req: any, res: Response, next: NextFunction) {
    try {
      const books = await bookService.getBooks();
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }

  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.getBookById(req.params.bookId);
      if (!book) {
        throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
      }
      return res.status(StatusCodes.OK).json({
        book,
      });
    } catch (err) {
      next(err);
    }
  }

  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      await bookService.createBook(req.body);
      return res.status(StatusCodes.CREATED).json({
        message: "Create book successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateBookById(req: Request, res: Response, next: NextFunction) {
    try {
      await bookService.updateBookById(req.params.bookId, req.body);
      return res.status(StatusCodes.OK).json({
        message: "Update book successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteBookById(req: Request, res: Response, next: NextFunction) {
    try {
      await bookService.deleteBookById(req.params.bookId);
      return res.status(StatusCodes.NO_CONTENT).json({
        message: "Delete book successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async getBooksByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await bookService.getBooksByUserId(req.params.userId);
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }

  async getOutdatedBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await bookService.getOutdatedBooks();
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }

  async getBooksByRenter(req: any, res: Response, next: NextFunction) {
    try {
      const books = await bookService.getBooksByUserId(req.userId);
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new BookController();
