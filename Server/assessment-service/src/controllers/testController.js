import Question from "../models/Question.js";
import TestSession from "../models/TestSession.js";


export const createTestSession =async(req,res)=>{
    try{
        // Support both single skillCategory (backward compatibility) and multiple skillCategories
        const { candidateId, jobId, skillCategory, skillCategories } = req.body;
        
        // Determine which format is being used
        const categories = skillCategories || (skillCategory ? [skillCategory] : []);
        
        console.log("📝 Received request body:", req.body);
        console.log("🔍 Searching for categories:", categories);
        
        if(categories.length === 0) {
            console.log("❌ No skill categories provided");
            return res.status(400).json({ message: "Please provide at least one skill category" });
        }
        
        // Fetch questions from ALL selected categories using MongoDB $in operator
        const allQuestions = await Question.find({ category: { $in: categories } });
        console.log("📊 Found questions:", allQuestions.length);
        console.log("📋 Questions by category:", allQuestions.reduce((acc, q) => {
            acc[q.category] = (acc[q.category] || 0) + 1;
            return acc;
        }, {}));
        
        if(allQuestions.length < 1) {
            console.log("❌ Not enough questions for categories:", categories);
            return res.status(400).json({ message: "Not enough questions for selected skills" });
        }

        // Randomly select questions from the mixed pool
        const randomQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, Math.min(10, allQuestions.length));

        const testQuestions= randomQuestions.map((q)=>({
            questionId:q._id,
            questionText: q.questionText,
            options: q.options,
            category: q.category, // Include category info for reference
        }))

        const testSession = new TestSession({candidateId, jobId, questions:testQuestions})
        await testSession.save()

        console.log("✅ Test created with", testQuestions.length, "questions from", categories.length, "categories");
        res.status(201).json({success:true, testId:testSession._id, questions:testQuestions})
    }
    catch(err){
        console.error("❌ Error creating test session:", err.message);
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