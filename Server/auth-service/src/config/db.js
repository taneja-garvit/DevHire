import mongoose from "mongoose";

const connectdb = async()=>{
    try{
        await mongoose.connect(url);
        console/log("MongoDB Connected!")
    }
    catch (err){
        console.error("MongoDB Connection Error",err.message);
        process.exit(1);
    }
};

export default connectdb;