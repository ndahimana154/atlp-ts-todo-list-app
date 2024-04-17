import express, { Express, Request, Response } from "express";
import bcrypt from "bcrypt";
import usersModel from "../models/usersModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



// Create user
const postUser = async (req: Request, res: Response) => {
  const pw = await bcrypt.hash(req.body.password, 10);
  const data = new usersModel({
    username: req.body.username,
    password: pw,
  });
  try {
    const dataToSave = await data.save();
    res.status(201).json({ dataToSave, msg: "User created successfully" });
  } catch (error) {
    console.error("Failed to save user", error);
    res.status(500).json({ error: error });
  }
};

// Listing users
const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await usersModel.find().sort({ username: 1 });
    if (data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Failed to fetch users", error);
    res.status(500).json({ error: error });
  }
};

// Logging in
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(500).json({ error: "Incorrect password" });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SESCRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: "Error logging in." });
  }
};

module.exports = {
  postUser,
  getUsers,
  loginUser,
};
