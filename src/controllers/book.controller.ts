import { NextFunction, Request, Response } from "express";
import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { bookService } from "../services";

const createBook = catchAsync(async (req: Request, res: Response) => {
  console.log("create book");
  const book = await bookService.createBook(req.body);
  res.status(StatusCodes.CREATED).send(book);
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getBooks();
  res.send(result);
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const book = await bookService.getBookById(req.params.bookId);
  if (!book) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
  }
  res.send(book);
});

const updateBookById = catchAsync(async (req: Request, res: Response) => {
  const book = await bookService.updateBookById(req.params.bookId, req.body);
  res.send(book);
});

const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  await bookService.deleteBookById(req.params.bookId);
  res.status(StatusCodes.NO_CONTENT).send();
});

const getBooksByUserId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.getBooksByUserId(req.params.userId);
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }
);

const getOutdatedBooks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.getOutdatedBooks();
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }
);

const getBooksByRenter = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const books = await bookService.getBooksByUserId(req.userId);
      return res.status(StatusCodes.OK).json({
        books,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getBooksByUserId,
  getOutdatedBooks,
  getBooksByRenter,
};
