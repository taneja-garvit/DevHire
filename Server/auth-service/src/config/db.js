import mongoose from "mongoose";

const url=process.env.MONGO_URL;
const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected!")
    }
    catch (err){
        console.error("MongoDB Connection Error",err.message);
        process.exit(1);
    }
};

export default connectdb;