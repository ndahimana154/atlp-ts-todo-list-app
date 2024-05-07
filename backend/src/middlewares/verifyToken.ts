const secretKey = "ofierhjfuionvdfiojvadfiovfviofdjvdfvddvsiosdjai.2122cds";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import usersModel from "../database/models/usersModel";

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
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default verifyToken;
