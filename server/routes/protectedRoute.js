// routes/protectedRoute.js
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { connectToDatabase } from '../lib/db.js';

const router = express.Router();

// Example of a protected route
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query('SELECT id, name, email, mobile FROM users WHERE id = ?', [req.user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error fetching user data." });
  }
});

export default router;
