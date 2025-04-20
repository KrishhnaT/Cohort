import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // adjust path as needed


const signup = async (req, res) => {
    try {
      const {email, password, name} = req.body;
      if(!email || !password || !name){
        throw new Error("All Fields are Required");
      }

      const userAlreadyExists = await User.findOne({email});
      if(userAlreadyExists){
        throw new Error ("User Already Exists");
      }
     
      const hashedPassword = await bcrypt.hash(password, 12);
      const verificationToken = await generateVerificationCode();
      const user = new User ({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

      //Jwt
      const verificationTokenoken = await generateTokenAndSetCookie(res,user._id);
      console.log(verificationToken);
      res.status(200).json({
        success: true,
        message: "User successfully created",
        user:{
          ...user._doc,
          password: undefined,
        }});

      await user.save();

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
   };
   
const login = async (req, res) => {
     res.send("Login");
   };
   
const logout = async (req, res) => {
     res.send("logout");
   };

   

export { signup, login, logout };
   