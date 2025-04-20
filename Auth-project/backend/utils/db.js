import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db = async () => {
     try {
         const conn = await mongoose.connect(process.env.MONGO_URI)
         console.log(`MongoDB Connected✅: ${conn.connection.host}`)
     } catch (error) {
          console.log("Error Connecting DB:", error.message)
          process.exit(1);//Failure , 0 status code = success
     }
}

export {db};
