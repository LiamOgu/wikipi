import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getHome, login, register } from "../controllers/authController.js";
import {RateLimter} from "../middleware/rateLimiter.js"

const router = express.Router();

router.post("/register", RateLimter, register);

router.post("/login", RateLimter, login);

router.get("/home", verifyToken, RateLimter, getHome);

export default router;
