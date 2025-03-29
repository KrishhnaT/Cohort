import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

import userRouter from "./routes/auth.routes.js"



dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express());
app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
     origin:process.env.BASE_URL,
}));

app.use("/api/v1/users",userRouter)

app.get('/',(req,res) =>{
     res.status(200).json({
          success:true,
          message:"Test"
     })
});



app.listen(port , ()=>{
     console.log(`Server initialized at http://localhost:${port}`);
})
