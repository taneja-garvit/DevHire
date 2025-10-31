import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        return console.log("Connected to MongoDB");
    }
    catch(err){
        console.error("Connection failed",err.message);
        process.exit(1);
    }
}

export default connectDB