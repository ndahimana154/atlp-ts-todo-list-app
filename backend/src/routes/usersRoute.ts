import express from "express";

import { postUser, getUsers, loginUser } from "../controllers/usersController";

const router = express.Router();

// Create a user
router.post("/", postUser);

// Get users
router.get("/", getUsers);

router.post("/login", loginUser);

export default router;
