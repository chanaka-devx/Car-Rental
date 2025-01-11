import express from 'express';
import upload from '../middleware/multer.js'; // Multer configuration
import { connectToDatabase } from '../lib/db.js';

const router = express.Router();

router.post('/cars', upload.single('image'), async (req, res) => {
  const { brand, model, vnumber, color, yom } = req.body;
  const imagePath = req.file ? req.file.path : null; // Get the uploaded file's path

  try {
    const db = await connectToDatabase();

    // Insert the car details into the database
    const sql = "INSERT INTO cars (Brand, Model, Number, Color, YOM, Image) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [brand, model, vnumber, color, yom, imagePath]);

    return res.status(201).json({
      success: true,
      message: "Car uploaded successfully.",
      data: { id: result.insertId, brand, model, vnumber, color, yom, image: imagePath }
    });
  } catch (err) {
    console.error("Error uploading car:", err);
    return res.status(500).json({ success: false, message: "Error uploading car." });
  }
});

export default router;
