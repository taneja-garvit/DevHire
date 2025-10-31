import Question from "../models/Question.js"

export const getAllQuestions =async(req,res)=>{
    try{
        const questions = await Question.find()
        res.status(200).json({success:true, count:questions.length , questions})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}