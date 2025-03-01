
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export const connectToDatabase = async () => {

  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || X9WoYt9eooRIgs91VSrH,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10, // Adjust based on your DB limit
      queueLimit: 0, // Unlimited queue
    });
  }
  return pool;
  

  
};
