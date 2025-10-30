import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const jwtSecret = process.env.JWT_SECRET

export const signup= async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if (!name || !email || !password || !role)
        return res.status(400).json({ message: "All fields required" });
        
        const existing = await User.findOne({email});
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

export const login= async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"No user found"});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(401).json({message:"Wrong Credentials"});

        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.json({token,user});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const getMe = async(req,res)=>{
     try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}