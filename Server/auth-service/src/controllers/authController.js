import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signup= async(requestAnimationFrame,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if (!name || !email || !password || !role)
        return res.status(400).json({ message: "All fields required" });
        
        const existing = User.findOne(email);
        if(existing) return res.status(400).json({message:"User already exist"});

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({name, email, password: hashed, role});

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({token,user});

    }
     catch(err){
        res.status(500).json({ message: err.message });
     }
}