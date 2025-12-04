import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test de connexion au démarrage
pool
  .getConnection()
  .then((connection) => {
    console.log("Connecté à MySQL avec pool");
    connection.release();
  })
  .catch((err) => {
    console.error("Erreur connexion DB:", err.message);
  });

export { pool };
