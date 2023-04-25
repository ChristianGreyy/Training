import HttpException from "../configs/HttpException";
import { StatusCodes } from "http-status-codes";
import { Book, User } from "../models/index";
import RentBookDto from "../dtos/book/rent-book.dto";
import IUser from "../interfaces/user.interface";
import bookServices from "./book.services";

class UserSerivce {
  async getUsers() {
    return await User.find();
  }

  async createUser(userBody: any) {
    return User.create(userBody);
  }

  async getUserById(userId: string) {
    return await User.findById(userId);
  }

  async updateUserById(userId: string, updateBody: any) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  }

  async deleteUserById(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found !");
    }
    await user.deleteOne({ _id: user._id });
    return user;
  }

  async rentBook(bookId: string, userId: string, rentBookDto: RentBookDto) {
    const user: any = await this.getUserById(userId);
    if (user.books.length > 3) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Don't rent >= 3 books");
    }
    const book: any = await bookServices.getBookById(bookId);
    if (!book) throw new HttpException(StatusCodes.NOT_FOUND, "Book not found");

    const session = await User.startSession();
    session.startTransaction();
    try {
      const opts = { session };
      await User.updateOne(
        {
          _id: user._id,
        },
        {
          latest_rent_day: new Date(),
          $push: {
            books: {
              book: book._id,
              start_time: rentBookDto.start_time,
              end_time: rentBookDto.end_time,
            },
          },
        },
        opts
      );

      await Book.updateOne(
        {
          _id: book._id,
        },
        {
          $push: { users: user._id },
        },
        opts
      );

      await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

export default new UserSerivce();
