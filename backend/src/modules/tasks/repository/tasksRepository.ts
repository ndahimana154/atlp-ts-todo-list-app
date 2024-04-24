import tasksModel from "../../../database/models/tasksModel";

// Function to create a new task
const createTask = async (
  title: string,
  description: string,
  isCompleted: boolean
) => {
  const newTask = new tasksModel({ title, description, isCompleted });
  return newTask.save();
};

// Function to fetch all tasks
const getAllTasks = async () => {
  return tasksModel.find().sort({ createdAt: -1 });
};

// Function to find a task by ID
const getTaskById = async (id: string) => {
  return tasksModel.findById(id);
};

// Function to update a task by ID
const updateTaskById = async (id: string, updatedTaskData: any) => {
  const options = { new: true };
  return tasksModel.findByIdAndUpdate(id, updatedTaskData, options);
};
// Function to delete a task by ID
const deleteTaskById = async (id: string) => {
  return tasksModel.findByIdAndDelete(id);
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};