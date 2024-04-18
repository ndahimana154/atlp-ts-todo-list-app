import mongoose, { mongo } from "mongoose";
import { Request, Response } from "express";
import tasksModel from "../../../database/models/tasksModel";

// Post Task
const postTask = async (req: Request, res: Response) => {
  const data = new tasksModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const dataToSave = await data.save();
    res.status(201).json({ status: 201, message: "Success", data });
  } catch (error) {
    console.error("Failed to POST task:", error);
    res.status(500).json({ error: error });
  }
};

// Get all tasks
const getTasks = async (req: Request, res: Response) => {
  try {
    const data = await tasksModel.find().sort({ createdAt: 1 });
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 400, error: "Invalid ID" });
  }
  try {
    const data = await tasksModel.findById(id);
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

  // Check if the provided task ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Task ID" });
  }

  try {
    const updatedTaskData = req.body; // Extract updated task data from request body

    // Specify options to return the updated document
    const options = { new: true };

    // Find the task by ID and update it with the new data
    const updatedTask = await tasksModel.findByIdAndUpdate(id, updatedTaskData, options);

    // If no task was found with the provided ID, return a 404 error
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // If the task was successfully updated, respond with the updated task data
    res.status(200).json({ status: 200, message: "Success", result: updatedTask });
  } catch (error) {
    // If an error occurs during the update operation, return a 500 error
    console.error("Failed to UPDATE task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete Task
const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Task ID" });
  }
  try {
    const data = await tasksModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Failed to DELETE task:", error);
    res.status(500).json({ error: error });
  }
};

export default {
  postTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
