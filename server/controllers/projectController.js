import { pool } from "../lib/db.js";

export const createProject = async (req, res) => {
  const { title, description } = req.body;

  const userId = req.userId;

  console.log("Tentative création projet par user:", userId, "Données:", {
    title,
    description,
  });

  try {
    const projectData = {
      title: title.trim(),
      description: description ? description.trim() : null,
      created_by: userId,
    };

    const [result] = await pool.query(
      `INSERT INTO projects (title, description, created_by) VALUES (?, ?, ?)`,
      [projectData.title, projectData.description, projectData.created_by]
    );

    res.status(201).json({ message: "Projet créé avec succès" });
  } catch (error) {
    console.error("Erreur création projet:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Un projet avec ce titre existe déjà",
      });
    }

    if (error.code === "ER_DATA_TOO_LONG") {
      return res.status(400).json({
        success: false,
        message: "Le titre est trop long (max 255 caractères)",
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du projet",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const [projects] = await pool.query(
      `SELECT id, title, description, created_by, created_at 
      FROM projects ORDER BY created_at DESC`
    );

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Erreur récupération projets:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des projets",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
};

export const getProject = async (req, res) => {};
