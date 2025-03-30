import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/db.connect.js";

dotenv.config({
     path: './.env'
});

const port = process.env.PORT || 8000;

connectDB()
     .then(() => {
          app.listen(port, (req,res)=> {
               console.log(`Server running on ${port} `)
          })
     })
     .catch((err) => {
          console.error("Mongo Connection error" , err)
          process.exit(1)
     })



