import express from "express";
import dotenv from "dotenv";
import {db} from "./utils/db.js";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();

const app = express();

const PORT = process.env.port || 5000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res) => {
     res.send("Hello From homepage");
})

app.use("/api/auth", authRoutes)

app.listen(PORT , () => {
     db();
     console.log(`Server Started at :- ${PORT}`);
     console.log(`http://localhost:${PORT}/api/auth`);
})