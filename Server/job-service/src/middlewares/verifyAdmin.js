import jwt from "jsonwebtoken";


export const verifyAdmin = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader|| !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "No token provided" });

    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="recruiter"){
            return res.status(403).json({ message: "Access denied: Admin only" });
        }
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"})
    }
}