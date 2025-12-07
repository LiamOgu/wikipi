import { pool } from "../lib/db.js";

// fonction pour les admin uniquement
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, avatar_url, created_at FROM users ORDER BY created_at DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur récupération utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const validRoles = ["admin", "modo", "member"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Rôle invalide" });
  }

  try {
    const [rows] = await pool.query("SELECT id FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);

    res.status(200).json({
      message: "Rôle mis à jour avec succès",
      user: { id, role },
    });
  } catch (error) {
    console.error("Erreur mise à jour rôle:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const [userCount] = await pool.query("SELECT COUNT(*) as count FROM users");
    const [projectCount] = await pool.query(
      "SELECT COUNT(*) as count FROM projects"
    );
    const [docCount] = await pool.query(
      "SELECT COUNT(*) as count FROM documentations"
    );

    const [roleDistribution] = await pool.query(
      "SELECT role, COUNT(*) as count FROM users GROUP BY role"
    );

    res.status(200).json({
      stats: {
        users: userCount[0].count,
        projects: projectCount[0].count,
        documents: docCount[0].count,
      },
      roleDistribution,
    });
  } catch (error) {
    console.error("Erreur stats admin:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
