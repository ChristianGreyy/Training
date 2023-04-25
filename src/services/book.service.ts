import CreateBookDto from "../dtos/book/create-book.dto";
import UpdateBookDto from "../dtos/book/update-book.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import RentBookDto from "../dtos/book/rent-book.dto";
import { Sequelize } from "sequelize";
import IBook from "../interfaces/book.interface";
const db = require("../models/index.js");

class BookService {
  async getBooks(): Promise<IBook[]> {
    return await db.Book.findAll();
  }

  async getBookById(bookId: string): Promise<IBook> {
    const book = await db.Book.findByPk(bookId);
    return book;
  }

  async createBook(createBookDto: Partial<CreateBookDto>): Promise<IBook> {
    return await db.Book.create(createBookDto);
  }

  async updateBookById(
    bookId: string,
    updateBookDto: Partial<UpdateBookDto>
  ): Promise<void> {
    const book = await this.getBookById(bookId);
    if (!book) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
    }
    return await db.Book.update(updateBookDto, {
      where: {
        id: bookId,
      },
    });
  }

  async deleteBookById(bookId: string): Promise<void> {
    const book = await this.getBookById(bookId);
    if (!book) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
    }
    return await db.Book.destroy({
      where: {
        id: bookId,
      },
    });
  }

  async getBooksByUserId(userId: string): Promise<IBook> {
    const user: any = await db.User.findOne({
      where: { id: userId },
      include: db.Book,
    });

    const books = user?.Books || [];
    return books;
  }

  async getOutdatedBooks(): Promise<IBook[]> {
    const books: any = await db.Book.findAll({
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("outdated")),
        "<",
        new Date(Date.now())
      ),
      // where: { end_time: { $gt: Date.now() } },
    });
    return books;
  }
}

export default new BookService();
