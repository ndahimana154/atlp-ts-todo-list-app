import { Request, Response } from "express";
import taskRepository from "../repository/tasksRepository";
import tasksModel from "../../../database/models/tasksModel";

// Post Task
const postTask = async (req: any, res: Response) => {
  const user: string = req.user.userId;
  const title = req.body.title;
  const description = req.body.description;
  const isCompleted = false;
  // console.log( title, description, isCompleted );
  try {
    const dataToSave = await taskRepository.createTask(
      title,
      description,
      user,
      isCompleted
    );
    res.status(201).json({ status: 201, message: "Success", data: dataToSave });
  } catch (error) {
    console.error("Failed to POST task:", error);
    res.status(500).json({ error });
  }
};

// Get all tasks
const getTasks = async (req: Request, res: Response) => {
  try {
    const data = await taskRepository.getAllTasks();
    if (data.length === 0) {
      return res.status(404).json({ status: 404, error: "No data found" });
    } else {
      res.status(200).json({ status: 200, message: "Success", data });
    }
  } catch (error) {
    console.error("Failed to get tasks:", error);
    res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
};

// Get single task
const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await taskRepository.getTaskById(id);
    if (!data) {
      return res.status(404).json({ status: 404, error: "Not found" });
    }
    res.status(200).json({ status: 200, message: "Success", data });
  } catch (error) {
    console.error("Failed to get task:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

// Update Task
const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTaskData = req.body;
    const updatedTask = await taskRepository.updateTaskById(
      id,
      updatedTaskData
    );
    if (!updatedTask) {
      return res.status(404).json({ status: 404, error: "Task not found" });
    }
    
    res
      .status(200)
      .json({ status: 200, message: "Success", result: updatedTask });
  } catch (error) {
    console.error("Failed to UPDATE task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const markCompleted = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     // Retrieve the task document from the database
//     const task = await tasksModel.findById(id);

//     // Check if the task exists
//     if (!task) {
//       return res.status(404).json({ status: 404, error: "Task not found" });
//     }

//     // Toggle the isCompleted property
//     task.isCompleted = !task.isCompleted;

//     // Save the updated task document
//     const markedTask = await task.save();

//     // If the task is successfully updated, return it in the response
//     res.status(200).json({
//       status: 200,
//       message: "Task marked as completed",
//       data: markedTask,
//     });
//   } catch (error) {
//     console.error("Failed to mark the task as completed:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Delete Task
const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await taskRepository.deleteTaskById(id);
    if (!data) {
      return res.status(404).json({ status: 404, error: "Task not found" });
    }
    res.status(200).json({ status: 200, message: "Success", data });
  } catch (error) {
    console.error("Failed to DELETE task:", error);
    res.status(500).json({ error });
  }
};

export default {
  postTask,
  getTasks,
  getTask,
  updateTask,
  // markCompleted,
  deleteTask,
};
