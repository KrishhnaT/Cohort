import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/",(req,res)=>{
     res.send("Welcome To Home Page")
})

app.use("/api/v1/auth", authRoutes)

app.listen(PORT,() =>{
     console.log(`Server Successfully Started at: ${PORT}`)
     console.log(`http://localhost:${PORT}/api/v1/auth`);
});