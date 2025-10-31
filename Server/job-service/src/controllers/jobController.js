import Job from "../models/job.js"

export const createJob = async(req,res)=>{
    try{
        const job = new Job({...req.body ,postedBy:req.user.id});
        await job.save();
        res.status(201).json({success:true,job});
    }
    catch(err){
    res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllJobs = async(req,res)=>{
    try{
        const filters={};
        const {skill,location,experienceLevel } = req.query;

        if(skill) filters.skills = {$regex: skill, $options: "i"}
        if(location) filters.location = {$regex: location, $options: "i"}
        if(experienceLevel) filters.experienceLevel = experienceLevel;

        const jobs = await Job.find(filters).sort({ createdAt: -1 })
        res.status(200).json({success:true, count:jobs.length,jobs})

    } 
    catch(err){
        res.status(500)
    }
}

export const getJobById = async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({message:"Job not found"});
        res.status(200).json({success:true,job})
    }
    catch(err){
        return res.status(500).json({message:"Server error",error: err.message})
    }
};
