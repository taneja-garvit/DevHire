import Question from "../models/Question";
import TestSession from "../models/TestSession.js";


export const createTestSession =async(req,res)=>{
    try{
        const { candidateId, jobId, skillCategory } = req.body;
        const allQuestions = await Question.find({category:skillCategory})
        if(allQuestions.length<10) return res.status(400).json({ message: "Not enough questions" });

        const randomQuestions  = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

        const testQuestions= randomQuestions.map((q)=>({
            questionId:q._id,
            questionText: q.questionText,
            options: q.options,
            
        }))

        const testSession = new testSession({candidateId, jobId, questions:testQuestions})
        await testQuestions.save()

        res.status(201).json({success:true, testId:testSession._id, questions:testQuestions})
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const getTestById= async(req,res)=>{
    try{
        const test = await TestSession.findById(req.params.id)
        if(!test) return res.status(404).json({ message: "Test not found" });

        res.status(200).json({success:true,test})
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}