import { Router } from "express";

import tasksRouter from "./tasksRoute";
import usersRouter from "./usersRoute";

const router = Router();

router.use("/tasks", tasksRouter);

router.use("/users", usersRouter);

export default router;
