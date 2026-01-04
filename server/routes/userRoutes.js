import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/me", verifyToken, updateUser);

export default router;