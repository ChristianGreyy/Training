import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import { Book, User } from "../models/index";
import { IBook } from "../interfaces/book.interface";
import CreateBookDto from "../dtos/book/create-book.dto";
import UpdateBookrDto from "../dtos/book/update-book.dto";
import { createNewBook } from "../queues/book-queue";
import { createClient } from "redis";
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

class BookSerivce {
  async getBooks() {
    // const books = await client.get()
    return await Book.find();
  }

  async createBook(bookBody: Partial<CreateBookDto>) {
    createNewBook(bookBody);
    return Book.create(bookBody);
  }

  async getBookById(bookId: string) {
    return await Book.findById(bookId);
  }

  async updateBookById(bookId: string, updateBody: Partial<UpdateBookrDto>) {
    const book = await this.getBookById(bookId);
    if (!book) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");
    }
    Object.assign(book, updateBody);
    await book.save();
    return book;
  }

  async deleteBookById(bookId: string) {
    const book = await this.getBookById(bookId);
    if (!book) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Book not found !");
    }
    await book.deleteOne({ _id: book._id });
    return book;
  }

  async getBooksByUserId(userId: string): Promise<IBook> {
    const user: any = await User.findOne({
      _id: userId,
    }).populate("books.book");
    const books = user?.books || [];
    return books;
  }

  async getOutdatedBooks(): Promise<any> {
    const books = await Book.find({
      outdated: {
        $lt: Date.now(),
      },
    });

    return books;
  }
}

export default new BookSerivce();
