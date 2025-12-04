import { pool } from "../lib/db.js";

export const getDocumentationsByProject = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.userId;

  try {
    // Vérifier que l'utilisateur a accès au projet
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
    // Vérifier que l'utilisateur peut créer dans ce projet
    const [project] = await pool.query(
      "SELECT id FROM projects WHERE id = ? AND created_by = ?",
      [projectId, userId]
    );

    if (project.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez pas créer de documentation dans ce projet",
      });
    }

    // Validation
    if (!title || !content || !excerpt) {
      return res.status(400).json({
        success: false,
        message: "Le titre, l'extrait et le contenu sont requis",
      });
    }

    // Créer la documentation
    const [result] = await pool.query(
      "INSERT INTO documentations (title, excerpt, content, project_id, created_by, last_modified_by) VALUES (?, ?, ?, ?, ?, NOW())",
      [title, excerpt, content, projectId, userId, userId]
    );

    // Récupérer la documentation créée
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
    console.error("Erreur création documentation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la documentation",
    });
  }
};
