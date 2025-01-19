import express from 'express';
import { connectToDatabase } from '../lib/db.js';

const router = express.Router();

// Book a car
router.post('/booking', async (req, res) => {
    const { car_id, user_name, user_email, user_phone, booking_date, booking_time } = req.body;
  
    // Validate required fields
    if (!car_id || !user_name || !user_email || !user_phone || !booking_date || !booking_time) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
  
    try {
      const db = await connectToDatabase();
      const sql = `
        INSERT INTO bookings (car_id, user_name, user_email, user_phone, booking_date, booking_time)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(sql, [
        car_id,
        user_name,
        user_email,
        user_phone,
        booking_date,
        booking_time,
      ]);
  
      res.status(201).json({
        success: true,
        message: 'Booking created successfully!',
        booking_id: result.insertId,
      });
    } catch (err) {
      console.error('Unable to book:', err);
      res.status(500).json({ success: false, message: 'Error creating booking.' });
    }
  });

  //Fetch all bookings
  router.get('/bookings', async (req, res) => {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.query('SELECT * FROM bookings');
      res.status(200).json({ success: true, data: rows });
    } catch (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ success: false, message: 'Error fetching bookings.' });
    }
  });
  

export default router;