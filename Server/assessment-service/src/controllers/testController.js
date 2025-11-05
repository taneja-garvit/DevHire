import Question from "../models/Question.js";
import TestSession from "../models/TestSession.js";


export const createTestSession =async(req,res)=>{
    try{
        const { candidateId, jobId, skillCategory } = req.body;
        console.log("📝 Received request body:", req.body);
        console.log("🔍 Searching for category:", skillCategory);
        
        const allQuestions = await Question.find({category:skillCategory})
        console.log("📊 Found questions:", allQuestions.length);
        console.log("📋 Questions:", allQuestions.map(q => ({ id: q._id, category: q.category, text: q.questionText.substring(0, 50) })));
        
        if(allQuestions.length<1) {
            console.log("❌ Not enough questions for category:", skillCategory);
            return res.status(400).json({ message: "Not enough questions" });
        }

        const randomQuestions  = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);

        const testQuestions= randomQuestions.map((q)=>({
            questionId:q._id,
            questionText: q.questionText,
            options: q.options,
            
        }))

        const testSession = new TestSession({candidateId, jobId, questions:testQuestions})
        await testSession.save()

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