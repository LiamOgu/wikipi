import { pool } from "../lib/db.js";

export const getDocumentationsByProject = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.userId;

  try {
    const [project] = await pool.query(
      "SELECT id FROM projects WHERE id = ? AND (created_by = ? OR is_public = true)",
      [projectId, userId]
    );

    if (project.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Projet non trouvé ou accès refusé",
      });
    }

    // Récupérer les documentations
    const [documentations] = await pool.query(
      `SELECT d.id, d.title, d.content, d.created_at, 
              u.name as author_name, u.email as author_email
       FROM documentations d
       JOIN users u ON d.created_by = u.id
       WHERE d.project_id = ?
       ORDER BY d.created_at DESC`,
      [projectId]
    );

    res.status(200).json({
      success: true,
      count: documentations.length,
      documentations: documentations,
    });
  } catch (error) {
    console.error("Erreur récupération documentations:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des documentations",
    });
  }
};

export const createDocumentation = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.userId;
  const { title, excerpt, content } = req.body;

  try {
    // Vérifier l'accès au projet
    const [project] = await pool.query(
      `SELECT id, created_by, is_public 
       FROM projects 
       WHERE id = ?`,
      [projectId]
    );

    if (project.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Projet non trouvé",
      });
    }

    const projet = project[0];

    // Vérifier les permissions
    if (projet.created_by !== userId && projet.is_public !== 1) {
      return res.status(403).json({
        success: false,
        error: "Vous n'avez pas accès à ce projet",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO documentations 
       (title, excerpt, content, project_id, created_by, last_modified_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, excerpt || null, content, projectId, userId, userId]
    );

    const [newDoc] = await pool.query(
      `SELECT d.*, u.name as author_name
       FROM documentations d
       JOIN users u ON d.created_by = u.id
       WHERE d.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Documentation créée avec succès",
      documentation: newDoc[0],
    });
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        error: "Le projet spécifié n'existe pas",
      });
    }

    if (error.code === "ER_BAD_NULL_ERROR") {
      return res.status(400).json({
        success: false,
        error: "Un champ requis est manquant",
      });
    }

    res.status(500).json({
      success: false,
      error: "Erreur serveur lors de la création",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getAllDocumentations = async (req, res) => {
  const userId = req.userId;

  try {
    const [documentations] = await pool.query(
      `SELECT 
        d.id,
        d.title,
        d.excerpt,
        d.content,
        d.created_at,
        d.updated_at,
        p.id as project_id,
        p.title as project_title,
        p.description as project_description,
        u.id as author_id,
        u.name as author_name,
        u.email as author_email,
        u.avatar_url as author_avatar
      FROM documentations d
      JOIN projects p ON d.project_id = p.id
      JOIN users u ON d.created_by = u.id
      WHERE p.created_by = ? OR p.is_public = 1
      ORDER BY d.created_at DESC
      LIMIT 20`,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: documentations.length,
      documentations: documentations,
    });
  } catch (error) {
    console.error("Erreur récupération documentations:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des documentations",
    });
  }
};

export const getDocumentationById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const [documentation] = await pool.query(
      `SELECT d.*, 
              p.title as project_title,
              p.description as project_description,
              u.name as author_name,
              u.avatar_url as author_avatar
       FROM documentations d
       JOIN projects p ON d.project_id = p.id
       JOIN users u ON d.created_by = u.id
       WHERE d.id = ? AND (p.created_by = ? OR p.is_public = 1)`,
      [id, userId]
    );

    if (documentation.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Documentation non trouvée ou accès refusé",
      });
    }

    res.status(200).json({
      success: true,
      documentation: documentation[0],
    });
  } catch (error) {
    console.error("Erreur récupération documentation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la documentation",
    });
  }
};
