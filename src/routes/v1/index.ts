import express from "express";
const router = express.Router();
import userRouter from "./user.route";
import bookRouter from "./book.route";
import authRouter from "./auth.route";

const defaultRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/books",
    route: bookRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
