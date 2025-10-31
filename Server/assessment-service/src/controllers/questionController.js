import Question from "../models/Question"

export const getAllQuestions =async(req,res)=>{
    try{
        const questions = Question.find()
        res.status(200).json({success:true, count:questions.length , questions})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}