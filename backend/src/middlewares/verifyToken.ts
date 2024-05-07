const secretKey = "ofierhjfuionvdfiojvadfiovfviofdjvdfvddvsiosdjai.2122cds";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import usersModel from "../database/models/usersModel";

// Define a new interface extending the Request interface
interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token found!" });
  }
 
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    // Call next middleware
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default verifyToken;
