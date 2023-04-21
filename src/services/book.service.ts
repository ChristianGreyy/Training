import CreateBookDto from "../dtos/book/create-book.dto";
import UpdateBookDto from "../dtos/book/update-book.dto";
import Book from "../models/book.model";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import userService from "./user.service";
import RentBookDto from "../dtos/book/rent-book.dto";
import User from "../models/user.model";
import { Sequelize } from "sequelize";

class BookService {
  async getBooks() {
    return await Book.findAll();
  }

  async getBookById(bookId: string) {
    const book = await Book.findByPk(bookId);
    return book;
  }

  async createBook(createBookDto: Partial<CreateBookDto>) {
    return await Book.create(createBookDto);
  }

  async updateBookById(bookId: string, updateBookDto: Partial<UpdateBookDto>) {
    const book = await this.getBookById(bookId);
    if (!book) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
    }
    return await Book.update(updateBookDto, {
      where: {
        id: bookId,
      },
    });
  }

  async deleteBookById(bookId: string) {
    const book = await this.getBookById(bookId);
    if (!book) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
    }
    return await Book.destroy({
      where: {
        id: bookId,
      },
    });
  }

  async rentBook(bookId: string, userId: string, rentBookDto: RentBookDto) {
    const user: any = await userService.getUserById(userId);
    const rentedBooks: any = await this.getBookByUserId(userId);
    const bookNumber: number = rentedBooks.length;
    if (bookNumber >= 3) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Don't rent >= 3 books");
    }
    const book: any = await this.getBookById(bookId);
    await user.addBook(book, { through: rentBookDto });
  }

  async getBookByUserId(userId: string) {
    const user: any = await User.findOne({
      where: { id: userId },
      include: Book,
    });

    const books = user?.Books || [];
    return books;
  }

  async getOutdatedBooks() {
    const books: any = await Book.findAll({
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
