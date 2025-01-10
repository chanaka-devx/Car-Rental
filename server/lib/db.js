
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "bs4qh2sqzllqiywkhuue-mysql.services.clever-cloud.com",
      user: process.env.DB_USER || "ujzgtj3nzwetaf8n",
      password: process.env.DB_PASSWORD || "X9WoYt9eooRIgs91VSrH",
      database: process.env.DB_DATABASE || "bs4qh2sqzllqiywkhuue",
    });
    console.log("Connected to the database.");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
