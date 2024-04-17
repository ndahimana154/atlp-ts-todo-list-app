import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// Import Routes
import tasksRoutes from "./routes/tasksRoute";
import usersRoutes from "./routes/usersRoute";

dotenv.config();

const app: Express = express();

const port: number = process.env.PORT || 3300;
const mongoUrl: string = process.env.MONGO_URI;
// Connect DB
mongoose
  .connect(mongoUrl)
  .then(() =>
    // Listen to hePORT
    app.listen(port, () =>
      console.log(`DB Connected and app running on http://localhost:${port}`)
    )
  )
  .catch((error) => console.log("Mongo DB Connection Error:", error));

// Middlewares: Allow to pass Body&Form datas
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, ": ", req.path);
  next();
});

// Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
