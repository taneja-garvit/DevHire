import Job from "./models/job.js"

export const createJob = async(req,res)=>{
    try{
        const job = new Job({...req.body,poster,postedBy:req.user.id});
        await job.save();
        res.status(201).json({success:true,job});
    }
    catch(err){
    res.status(500).json({ message: "Server error", error: error.message });
    }
};
