import express from "express";
const router = express.Router();
import userRouter from "./user.route";
import roleRouter from "./role.route";
import authRouter from "./auth.route";
import statusRouter from "./status.route";
import typeRouter from "./type.route";
import priorityRouter from "./priority.route";
import projectRouter from "./project.route";
import taskRouter from "./task.route";

const defaultRoutes = [
  {
    path: "/tasks",
    route: taskRouter,
  },
  {
    path: "/projects",
    route: projectRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/statuses",
    route: statusRouter,
  },
  {
    path: "/types",
    route: typeRouter,
  },
  {
    path: "/priorities",
    route: priorityRouter,
  },
  {
    path: "/roles",
    route: roleRouter,
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
