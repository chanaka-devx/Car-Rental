import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv'
import morgan  from 'morgan';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/auth', authRoutes);

const db = mysql.createConnection({
    host: "bs4qh2sqzllqiywkhuue-mysql.services.clever-cloud.com",
    user: "ujzgtj3nzwetaf8n",
    password: "X9WoYt9eooRIgs91VSrH",
    database: "bs4qh2sqzllqiywkhuue",
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM cars";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error occurred while fetching data.");
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO cars (`Brand`, `Model`, `Number`, `Color`, `YOM`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.brand,
        req.body.model,
        req.body.vnumber,
        req.body.color,
        req.body.yom
    ]
    
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE cars SET `Brand` = ? , `Model` = ? , `Number` = ? , `Color` = ? , `YOM` = ?  WHERE `ID` = ?";
    const values = [
        req.body.brand,
        req.body.model,
        req.body.vnumber,
        req.body.color,
        req.body.yom
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/car/:id', (req, res) => {
    const sql = "DELETE FROM cars WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
          }
          return res.json(data);
    })
});


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
