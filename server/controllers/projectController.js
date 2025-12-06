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
  const userId = req.userId;

  try {
    const [projects] = await pool.query(
      `SELECT id, title, description, created_by, is_public, created_at 
      FROM projects
      WHERE created_by = ? OR is_public = true
      ORDER BY created_at DESC`,
      [userId]
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

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const [project] = await pool.query(
      `SELECT p.*, u.name as creator_name
       FROM projects p
       JOIN users u ON p.created_by = u.id
       WHERE p.id = ? AND (p.created_by = ? OR p.is_public = 1)`,
      [id, userId]
    );

    if (project.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Projet non trouvé ou accès refusé",
      });
    }

    res.status(200).json({
      success: true,
      project: project[0],
    });
  } catch (error) {
    console.error("Erreur récupération projet:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du projet",
    });
  }
};
