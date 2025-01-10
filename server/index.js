// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoute.js';
import { connectToDatabase } from './lib/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Example route: Fetch all cars
app.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [data] = await db.query("SELECT * FROM cars");
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error occurred while fetching data.");
  }
});

// Create a new car
app.post('/create', async (req, res) => {
  const { brand, model, vnumber, color, yom } = req.body;
  try {
    const db = await connectToDatabase();
    const sql = "INSERT INTO cars (`Brand`, `Model`, `Number`, `Color`, `YOM`) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [brand, model, vnumber, color, yom]);
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error creating car." });
  }
});

// Update an existing car
app.put('/update/:id', async (req, res) => {
  const { brand, model, vnumber, color, yom } = req.body;
  const id = req.params.id;
  try {
    const db = await connectToDatabase();
    const sql = "UPDATE cars SET `Brand` = ?, `Model` = ?, `Number` = ?, `Color` = ?, `YOM` = ? WHERE `ID` = ?";
    const [result] = await db.query(sql, [brand, model, vnumber, color, yom, id]);
    return res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error updating car." });
  }
});

// Delete a car
app.delete('/car/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const db = await connectToDatabase();
    const sql = "DELETE FROM cars WHERE ID = ?";
    const [result] = await db.query(sql, [id]);
    return res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error deleting car." });
  }
});

// Start server on PORT from .env (fallback to 8081 if not set)
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
