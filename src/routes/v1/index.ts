import express from "express";
const router = express.Router();
import userRouter from "./user.router";
import bookRouter from "./book.router";

const defaultRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/books",
    route: bookRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
