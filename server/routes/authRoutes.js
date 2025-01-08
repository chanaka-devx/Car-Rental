import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// REGISTER (SIGN-UP)
router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const db = await connectToDatabase();

    // Check if user already exists
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)",
      [name, email, mobile, hashedPassword]
    );

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectToDatabase();

    // Check if user exists in DB
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "User does not exist." });
    }

    const user = rows[0];

    // Compare submitted password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // If we get here, user is authenticated
    // In a real-world app, you'd typically issue a token (JWT, etc.)
    return res.status(200).json({ message: "Login successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
