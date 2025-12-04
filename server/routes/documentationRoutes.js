import express from "express";
import {
  getDocumentationsByProject,
  createDocumentation,
} from "../controllers/documentationController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/projects/:projectId/documentations", getDocumentationsByProject);

router.post("/projects/:projectId/documentations", createDocumentation);

export default router;
