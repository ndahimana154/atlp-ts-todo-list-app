import express from "express";

import {
  postUser,
  getUsers,
  loginUser,getTaskByUserName
} from "../modules/users/controller/usersController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

// Create a user
router.post("/", postUser);

// Get users
router.get("/", getUsers);

// Get tasks by userId
router.get("/tasks",verifyToken, getTaskByUserName)

router.post("/login", loginUser);

export default router;
