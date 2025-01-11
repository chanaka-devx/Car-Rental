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


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

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


app.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [data] = await db.query("SELECT * FROM cars");

    const carsWithImageURLs = await Promise.all(
      data.map(async (car) => {
        try {
          // Generate a unique ID for the file
          const uniqueId = uuidv4();
          let filePath = car.Image;

          // Ensure the file path starts with "/CarRental/" and append the unique ID
          if (!filePath.startsWith('/CarRental')) {
            filePath = `/CarRental/${uniqueId}_${filePath}`;
          }

          console.log(`Processing filePath: ${filePath}`);

          let rawLink;

          // Check if a shared link already exists
          const existingLinksResponse = await dropbox.sharingListSharedLinks({
            path: filePath,
          });

          if (existingLinksResponse.result.links.length > 0) {
            // Use the existing shared link
            rawLink = existingLinksResponse.result.links[0].url.replace('?dl=0', '?raw=1');
          } else {
            // Create a new shared link
            const sharedLinkResponse = await dropbox.sharingCreateSharedLinkWithSettings({
              path: filePath,
            });
            rawLink = sharedLinkResponse.result.url.replace('?dl=0', '?raw=1');
          }

          return { ...car, Image: rawLink }; // Attach the raw link to the car object
        } catch (err) {
          console.error(`Error processing filePath ${car.Image}:`, err);
          return { ...car, Image: null }; // Fallback if link generation fails
        }
      })
    );

    res.json(carsWithImageURLs); // Send the processed car data
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ success: false, message: "Error fetching cars." });
  }
});



// Create a new car with image upload
app.post('/create', upload.single('image'), async (req, res) => {

  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { brand, model, vnumber, color, yom } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded.' });
    }

    const filePath = req.file.path; // Temporary file path
    const dropboxPath = `/CarRental/${req.file.filename}`; // Path in Dropbox

    // Read file and upload to Dropbox
    const fileContent = fs.readFileSync(filePath);
    await dropbox.filesUpload({
      path: dropboxPath,
      contents: fileContent,
    });

    // Clean up temporary file
    fs.unlinkSync(filePath);

    // Save car data to database
    const db = await connectToDatabase();
    const sql = "INSERT INTO cars (`Brand`, `Model`, `Number`, `Color`, `YOM`, `Image`) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(sql, [brand, model, vnumber, color, yom, dropboxPath]);

    res.status(201).json({
      success: true,
      message: 'Car created successfully!',
      data: { brand, model, vnumber, color, yom, image: dropboxPath },
    });
  } catch (err) {
    console.error('Error uploading to Dropbox:', err);
    res.status(500).json({ success: false, message: 'Error uploading car.' });
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


// Start server on PORT from .env (fallback to 3003 if not set)
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
