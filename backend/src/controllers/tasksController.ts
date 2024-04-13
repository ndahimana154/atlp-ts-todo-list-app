import mongoose, { mongo } from "mongoose";
import { Request, Response } from "express";
import tasksModel from "../models/tasksModel";

// Post Task
const postTask = async (req: Request, res: Response) => {
  const data = new tasksModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json({ dataToSave });
  } catch (error) {
    console.error("Failed to POST task:", error);
    res.status(500).json({ error: error });
  }
};

// Get all tasks
const getTasks = async (req: Request, res: Response) => {
  try {
    const data = await tasksModel.find().sort({ title: 1 });
    if (data.length === 0) {
      return res.status(404).json({ error: "No data found." });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Failed to get tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get single task
const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Task ID" });
  }
  try {
    const task = await tasksModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: "No Task Found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error("Failed to get task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Task
const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Task ID" });
  }
  try {
    const updatedTask = req.body;
    const options = { new: true };
    const result = await tasksModel.findByIdAndUpdate(id, updatedTask, options);
    if (!result) {
      return res.status(404).json({ error: "Task not Found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    console.error("Failed to UPDATE task:", error);
    res.status(500).json({ error: error });
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

module.exports = {
  postTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
