import express from 'express';
import { registerUser, verifyUser, loginUser, getMe, logoutUser, forgotPassword, resetPassword }  from "../controllers/user.controller.js"
import { isLoggedin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/register" , registerUser);
router.get("/verify/:token",verifyUser);
router.post("/login",loginUser);
router.get("/me",isLoggedin,getMe);
router.get("/logout",isLoggedin,logoutUser);
router.get("/forgotpassword",forgotPassword);
router.get("/resetpassword",resetPassword)


export default router;