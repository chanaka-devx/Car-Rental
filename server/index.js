import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoute.js';
import { connectToDatabase } from './lib/db.js';
import carRoutes from './routes/carRoutes.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Dropbox } from 'dropbox';
import { v4 as uuidv4 } from 'uuid';
import usersRoute from "./routes/usersRoute.js"; 
import bodyParser from 'body-parser';
import bookRouter from './routes/bookRoutes.js';
import { v2 as cloudinary } from 'cloudinary';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("/users", usersRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Multer for image uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const dropbox = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/cars', carRoutes);
app.use('/books', bookRouter);

//------------------------------------------------------------------------------------------------------------------------------


//search results
app.post('/search', (req, res) => {
  console.log('Request received:', req.body);
  const location = req.body.location;

  const db =  connectToDatabase();
  const sql = 'SELECT * FROM cars WHERE `Location` = ?';
  db.query(sql, [location], (err, results) => {

    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Database query error');
    } else {
      res.json(results);
    }
  });
});

//------------------------------------------------------------------------------------------------------------------------------


//Fetch car details
app.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [data] = await db.query("SELECT * FROM cars");

    console.log(data);

    res.json(data);

  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ success: false, message: "Error fetching cars." });
  }
});

//----------------------------------------------------------------------------


// Create a new car with image upload

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dhbormcgi",
  api_key: "747529268123495",
  api_secret: "e-imcDaPM2qa7rDbYHeERv6o6R8",
});

app.post('/create', upload.single('image'), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { brand, model, vnumber, color, location, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded.' });
    }

    // Upload image to Cloudinary
    const filePath = req.file.path; // Temporary file path
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
      folder: 'CarRental', // Specify the folder in Cloudinary
    });

    // Clean up temporary file
    fs.unlinkSync(filePath);

    // Save car data to database
    const db = await connectToDatabase();
    const sql = "INSERT INTO cars (`Brand`, `Model`, `Number`, `Color`, `Location`, `Price`, `Image`) VALUES (?, ?, ?, ?, ?, ? , ?)";
    await db.query(sql, [brand, model, vnumber, color, location, price, cloudinaryResponse.secure_url]);

    res.status(201).json({
      success: true,
      message: 'Car created successfully!',
      data: { 
        brand, 
        model, 
        vnumber, 
        color, 
        location, 
        price, 
        image: cloudinaryResponse.secure_url 
      },
    });
  } catch (err) {
    console.error('Error uploading to Cloudinary:', err);
    res.status(500).json({ success: false, message: 'Error uploading car.' });
  }
});

//----------------------------------------------------------------------------

// Update an existing car
app.put('/update/:id', async (req, res) => {
  const { brand, model, vnumber, color, location, price} = req.body;
  const id = req.params.id;
  try {
    const db = await connectToDatabase();
    const sql = "UPDATE cars SET `Brand` = ?, `Model` = ?, `Number` = ?, `Color` = ?, `Location` = ?, `Price` = ? WHERE `ID` = ?";
    const [result] = await db.query(sql, [brand, model, vnumber, color, location, price, id]);
    return res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error updating car." });
  }
});


//----------------------------------------------------------------------------

// Delete a car
app.delete('/car/:id', async (req, res) => {
  const id = req.params.id.trim();
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

//------------------------------------------------------------------------------------------------------------------------------


// Book a car
app.post('/booking', async (req, res) => {
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


//------------------------------------------------------------------------------------

//Fetch all bookings
app.get('/bookings', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query('SELECT * FROM bookings');
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ success: false, message: 'Error fetching bookings.' });
  }
});

//------------------------------------------------------------------------------------

// Delete a booking by ID
app.delete('/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
    const db = await connectToDatabase();
    const sql = 'DELETE FROM bookings WHERE id = ?';
    const [result] = await db.query(sql, [bookingId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.status(200).json({ success: true, message: 'Booking deleted successfully!' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ success: false, message: 'Error deleting booking.' });
  }
});

//------------------------------------------------------------------------------------

//Checking booking status
app.get('/bookings/status/:car_id', async (req, res) => {
  const carId = req.params.car_id;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query('SELECT * FROM bookings WHERE car_id = ?', [carId]);

    if (rows.length > 0) {
      return res.status(200).json({ success: true, booked: true, message: 'Car is already booked.' });
    } else {
      return res.status(200).json({ success: true, booked: false, message: 'Car is available for booking.' });
    }
  } catch (err) {
    console.error('Error checking booking status:', err);
    res.status(500).json({ success: false, message: 'Error checking booking status.' });
  }
});



//------------------------------------------------------------------------------------


// Fetch all cars on rides page
app.get('/api/cars', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const sql = "SELECT * FROM cars";
    const [cars] = await db.query(sql);

    res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cars.',
    });
  }
});


//------------------------------------------------------------------------------------

//Fetching users
app.get('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const db = await connectToDatabase();
    const sql = "SELECT Name, Email, Mobile FROM users WHERE ID = ?";
    const [user] = await db.query(sql, [userId]);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.status(200).json({
      success: true,
      user: user[0]
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data."
    });
  }
});




// Start server on PORT from .env (fallback to 5176 if not set)
const PORT = process.env.PORT || 5176;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
