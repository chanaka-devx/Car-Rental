import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "firstdb",
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).send("Error occurred while fetching data.");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE `ID` = ?";
    const values = [
        req.body.name, 
        req.body.email
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
});


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8081");
});
