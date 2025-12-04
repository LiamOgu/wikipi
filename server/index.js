import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import documentationRoutes from "./routes/documentationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api", documentationRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
