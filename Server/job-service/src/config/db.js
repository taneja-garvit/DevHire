import mongoose from "mongoose";

const connectdb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected!");

    } catch(err){
        console.error("Error connecting mongodb",err.message);
        process.exit(1);
    }
}

export default connectdb