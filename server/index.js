import express from 'express'

const app = express();

app.use("/",(req,res)=>{
    res.send("hello world");
})

app.listen(8988, ()=>{
    console.log("server is running on port 8988");
})