import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import usersModel from "../database/models/usersModel";

// Define a new interface extending the Request interface
interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}

// Secret key for JWT verification
const secretKey = "ofierhjfuionvdfiojvadfiovfviofdjvdfvddvsiosdjai.2122cds";

// Middleware function to verify JWT token
const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract token from Authorization header
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Check if the token starts with "Bearer "
  const [bearer, token] = tokenHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach decoded user information to the request object
    req.user = decoded;
    
    // Call next middleware
    next();
  } catch (error) {
    // Token verification failed
    console.error("Invalid token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
