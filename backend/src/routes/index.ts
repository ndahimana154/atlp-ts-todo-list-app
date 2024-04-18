import { Router } from "express";

import tasksRouter from "./tasksRoute";

const router = Router();

router.use("/tasks", tasksRouter);

export default router;
