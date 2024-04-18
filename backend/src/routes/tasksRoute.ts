import express from "express";
import taskControllers from "../modules/tasks/controller/tasksController";

const tasksRouter = express.Router();

// Import
import verifyToken from "../middlewares/verifyToken";

// Post tasks
tasksRouter.post("/", taskControllers.postTask);

// Get tasks
tasksRouter.get("/", taskControllers.getTasks);

// Get Task
tasksRouter.get("/:id", taskControllers.getTask);

// updateTask
tasksRouter.patch("/:id", taskControllers.updateTask);

// Delete Task
tasksRouter.delete("/:id", taskControllers.deleteTask);

export default tasksRouter;
