import express from "express";

import { verifyToken } from "../middleware/auth.js";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import { validateProject } from "../validators/projectValidators.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", validateProject, createProject);
router.get("/", getProjects);

export default router;
