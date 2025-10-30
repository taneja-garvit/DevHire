import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET

export const protect = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "No token provided" });

    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
};