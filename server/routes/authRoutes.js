// routes/authRoutes.js
import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ success: true, message: "Welcome to the dashboard!" });
});

// REGISTER (SIGN-UP)
router.post('/register', async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    const db = await connectToDatabase();

    // Check if user already exists
    const [rows] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (Name, Mobile, Email, Password) VALUES (?, ?, ?, ?)",
      [name, mobile, email, hashedPassword]
    );

    return res.status(201).json({ success: true, message: "User created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectToDatabase();

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // Check if user exists in DB
    const [rows] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const user = rows[0];

    // Compare submitted password with hashed password
    const isMatch = await bcrypt.compare(password, user.Password); // Case-sensitive match
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.Email, role: user.role },
      process.env.JWT_SECRET,
      //{ expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
