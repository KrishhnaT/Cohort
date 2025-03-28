import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.connection.js';
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express()
const port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true,
  method:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type','Authorization']

}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

db();

// User Routes
app.use("/api/v1/users" , userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})