import Queue from "bull";
import { booksProcess } from "./books-queue-consumer";

const booksQueue = new Queue("books", {
  redis: process.env.REDIS_URL,
  limiter: {
    max: 1000,
    duration: 5000,
  },
});

booksQueue.process(booksProcess);

const createNewBook = (book: any) => {
  booksQueue.add(book, {
    priority: getBooksPriority(book),
    attempts: 2,
  });
};

const getBooksPriority = (books: any) => {
  return books.price > 20 ? 1 : 2;
};

export { createNewBook };
