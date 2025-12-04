import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../lib/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Répond au client
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: { id: result.insertId, name, email },
    });
  } catch (error) {
    console.error("Erreur inscription:", error);
    res.status(500).json({
      message: "Erreur lors de l'inscription",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length === 0) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mauvais mot de passe" });
    }
    const token = jwt.sign({ id: existingUsers[0].id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token: token });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors du login",
    });
  }
};

export const getHome = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.userId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "user do not exist" });
    }
    return res.status(201).json({ user: rows[0] });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
