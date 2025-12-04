import { verifyToken } from "../middleware/auth";
import { validateProject } from "../lib/validators";
import { createProject } from "../controllers/projectController";

router.post("/", verifyToken, validateProject, createProject);
