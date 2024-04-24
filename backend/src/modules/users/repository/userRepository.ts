import bcrypt from "bcrypt";
import usersModel from "../../../database/models/usersModel";

// Function to create a new user
const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new usersModel({ username, password: hashedPassword });
  return newUser.save();
};

// Function to fetch all users
const getAllUsers = async () => {
  return usersModel.find().sort({ username: 1 });
};

// Function to find a user by username
const findUserByUsername = async (username: string) => {
  return usersModel.findOne({ username }); 
};

export { createUser, getAllUsers, findUserByUsername };
