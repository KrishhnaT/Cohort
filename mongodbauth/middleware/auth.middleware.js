import jwt from "jsonwebtoken";


export const isLoggedIn = async (req,res,next) => {
     try {
          console.log(req.cookies);
          const token = req.cookies?.token
          console.log('Token Found', token? "YES":"NO");

          if(!token){
               console.log("NO TOKEN");
               return res.status(401).json({
                    message:"Token Not Found",
                    success: False,
               })
          }

          jwt.verify(token, proccess.env.JWT_SECRET)
          console.log("decode data",decoded);
          req.user = decoded;
          next();

     } catch (error) {
          console.log("Auth middleware failure");
          return res.status(500).json({
               success: false,
               message: "Internal Server error"
          })
     }
     next();
}