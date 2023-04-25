import CreateUserDto from "../dtos/user/create-user.dto";
import UpdateUserDto from "../dtos/user/update-user.dto";
import { StatusCodes } from "http-status-codes";
import HttpException from "../configs/HttpException";
import bookService from "./book.service";
import RentBookDto from "../dtos/book/rent-book.dto";
import IUser from "../interfaces/user.interface";
const db = require("../models/index.js");

class UserService {
  async getUsers(): Promise<IUser[]> {
    return await db.User.findAll();
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await db.User.findByPk(userId);
    return user;
  }

  async createUser(createUserDto: Partial<CreateUserDto>): Promise<IUser> {
    return await db.User.create(createUserDto);
  }

  async updateUserById(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>
  ): Promise<IUser> {
    const user = await this.getUserById(userId);
    console.log(user);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return await db.User.update(updateUserDto, {
      where: {
        id: userId,
      },
    });
  }

  async deleteUserById(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
    }
    return await db.User.destroy({
      where: {
        id: userId,
      },
    });
  }

  async rentBook(bookId: string, userId: string, rentBookDto: RentBookDto) {
    const user: any = await this.getUserById(userId);
    const rentedBooks: any = await bookService.getBooksByUserId(userId);
    const bookNumber: number = rentedBooks.length;
    if (bookNumber >= 3) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Don't rent >= 3 books");
    }
    const book: any = await bookService.getBookById(bookId);
    try {
      const result = await db.sequelize.transaction(async (t: any) => {
        await user.addBook(book, { through: rentBookDto }, { transaction: t });
        await db.User.update(
          { latest_rent_day: new Date() },
          {
            where: {
              id: userId,
            },
          },
          { transaction: t }
        );
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Transaction error"
      );
    }
  }
}

export default new UserService();
