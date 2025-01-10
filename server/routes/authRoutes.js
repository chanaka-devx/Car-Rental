// routes/authRoutes.js
import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

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

    // Check if user exists in DB
    const [rows] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "User does not exist." });
    }

    const user = rows[0];

    // Compare submitted password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    // If password matches, user is authenticated
    // Optionally, generate a JWT token here
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // Use the secret from environment variables
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    // Example (requires jsonwebtoken package):
    /*
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, message: "Login successful.", token });
    */

    return res.status(200).json({ success: true, message: "Login successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
