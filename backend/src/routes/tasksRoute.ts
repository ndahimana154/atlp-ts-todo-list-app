import express from "express";
import taskControllers from "../modules/tasks/controller/tasksController";

const tasksRouter = express.Router();

// Import
import verifyToken from "../middlewares/verifyToken";

// Post tasks
tasksRouter.post("/:id", verifyToken, taskControllers.postTask);

// Get tasks
tasksRouter.get("/", taskControllers.getTasks);

// Get task by user
tasksRouter.get("/user/:id", taskControllers.getUserTask);

// Get Task
tasksRouter.get("/:id", verifyToken, taskControllers.getTask);

// updateTask
tasksRouter.patch("/:id", taskControllers.updateTask);

// Delete Task
tasksRouter.delete("/:id", taskControllers.deleteTask);

// Mark completed
// tasksRouter.patch("/mark/:id", taskControllers.markCompleted);

export default tasksRouter;
