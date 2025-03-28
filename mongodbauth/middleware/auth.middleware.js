import jwt from "jsonwebtoken";


export const isLoggedin = async (req,res,next) => {
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

          jwt.verify(token, proccess.env.JWT_SECRET);

     } catch (error) {
          
     }
     next();
}