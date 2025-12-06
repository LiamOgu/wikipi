import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getHome, login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/home", verifyToken, getHome);

export default router;
