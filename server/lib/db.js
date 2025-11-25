import mysql from 'mysql2/promise' //promise car on utiliser l'asynchrone

let connection;

export const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
  }
  return connection
}