import { Request,Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usersModel from "../models/usersModel";
import { NextFunction } from "express";

dotenv.config();
const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SESCRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
 