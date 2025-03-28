import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req,res) => {

     //get data from req.body
     //validate
     //Check if user already exist 
     //Create a user in db
     //Create a token store one in db send one in mail to user
     //Send success message
     const {name, email, password} = req.body;
     if(!name || !email || !password){
          res.status(400).json({
               message:"All fields Required"
          });
          console.log("Error all fields not given ")
     }
     try {
        const existingUser = await User.findOne({email})
        if(existingUser){
          res.status(400).json({
               message:"User Already Exist"
          });
        }
        const user = await User.create({
          name,
          email,
          password
        });
        console.log(user);
        if(!user){
          res.status(400).json({
               message:"User Already Exist"
          });
        }

        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);
        user.verificationToken = token
        await user.save();

        //Send Mail
        const transporter = nodemailer.createTransport({
          host: process.env.MAILTRAP_HOST,
          port: process.env.MAILTRAP_PORT,
          secure: false, // true for port 465, false for other ports
          auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
          },
        });

        const mailOption = {
          from: process.env.MAILTRAP_SENDEREMAIL, // sender address
          to: user.email, // list of receivers
          subject: "Verify your Email. ✔", // Subject line
          text: `Please click on following link:
          ${process.env.BASE_URL}/api/v1/user/verify/${token}`, // plain text body
          
        };
        
        await transporter.sendMail(mailOption);

        res.status(200).json({
          message:"Registration Successful "
        }); 
      } catch (error) {
         res.status(400).json({
          message:"User not Registered"
         }) 
         console.log("Error message:-",error);
     }

}

const verifyUser = async (req,res) => {
//get token from url
//Validate Token 
//Find user based on verificationTOken 
//if not
//Set is Verified == True
//remove verification token 
// Save
//Return Response 

const {token} = req.params.token;
    if(!token){
  res.status(400).json({
    message:"No token Provided"
  });
}

    const user = await User.findOne({verificationToken: token});

    if(!user){
  res.status(400).json({
    message:"Invaild token",
  });
}

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({
      message:"Verified "
    })
    

}

const loginUser = async (req,res) => {
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({
      message: "All Fields Required"
    });
  }

  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message: "User not Found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if(!isMatch){
      return res.status(400).json({
        message:"Incorrect Password",
      })
    }

    const token = jwt.sign({id: user._id},
      process.env.JWT_SECRET,{
      expiresIn: '24h'
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24*60*60*1000
    }

    res.cookie("test" , token , {});

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
      }
    })

    } catch (error) {
    console.table(error);
    res.status(400).json({
      message: "Login Unsuccessful"
    })
  }
}

const getMe = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}

const logoutUser = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}

const forgotPassword = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}

const resetPassword = async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}

export  { registerUser, verifyUser, loginUser, getMe, logoutUser, forgotPassword, resetPassword } ;
