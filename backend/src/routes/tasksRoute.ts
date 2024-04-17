import express from "express";
import {
  postTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController";
const router = express.Router();

// Import
import  verifyToken  from "../middlewares/verifyToken";

// Post tasks
router.post("/", postTask);

// Get tasks
router.get("/", verifyToken, getTasks);

// Get Task
router.get("/:id", getTask);

// updateTask
router.patch("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

export default router;
