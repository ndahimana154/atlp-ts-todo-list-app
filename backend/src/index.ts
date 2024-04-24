import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import router from "./routes";
import cors from "cors";

import "./database/config/database";

const app: Express = express();
const port: number = 3300;

app.use(cors()); // Apply CORS middleware first

// Custom middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

app.use(express.json());
app.use("/api", router);

export default app;
