import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
    const token = jwt.sign(
        { userId }, // ✅ wrapped in an object
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};
