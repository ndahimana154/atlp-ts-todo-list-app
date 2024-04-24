import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  createUser,
  getAllUsers,
  findUserByUsername,
} from "../repository/userRepository";
import usersModel from "../../../database/models/usersModel";

// Variables
const secretKey = "ofierhjfuionvdfiojvadfiovfviofdjvdfvddvsiosdjai.2122cds";

// Create user
const postUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await usersModel.findOne({ username });

    if (existingUser) {
      // If the username already exists, throw an error
      return res.status(400).json({ error: "Username already exists" });
    }

 
    // If the username doesn't exist, create the user
    const newUser = await createUser(username, password);

    res.status(201).json({ newUser, msg: "User created successfully" });
  } catch (error) {
    console.error("Failed to save user", error);
    res.status(500).json({ error });
  }
};

// Listing users
const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAllUsers();
    if (data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Failed to fetch users", error);
    res.status(500).json({ error });
  }
};

// Logging in
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(500).json({ error: "Incorrect password" });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (error) {
    console.error("Error logging in", error);
    res.status(400).json({ error: "Error logging in." });
  }
};

export { postUser, getUsers, loginUser };
