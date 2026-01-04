import bcrypt from "bcrypt";
import { pool } from "../lib/db.js";

export const updateUser = async (req, res) => {
    const { name, password } = req.body;
    const userId = req.user.id;

    try {
        const fields = [];
        const values = [];

        if (name) {
            fields.push("name = ?");
            values.push(name);
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.push("password = ?");
            values.push(hashedPassword);
        }

        if (!fields.length) {
            return res.status(400).json({ message: "Aucune donnée à modifier" });
        }

        values.push(userId);

        const sql = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = ?
        `;

        await db.query(sql, values);

        res.json({ message: "Profil mis à jour" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};