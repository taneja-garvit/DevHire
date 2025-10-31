import Question from "../models/Question.js";
import Result from "../models/Result.js";
import { calculateScore } from "../utils/calculateScore.js";

export const evaluateTest = async (req, res) => {
  try {
    const { userId, testId, recruiterId, answers } = req.body;

    const questionIds = answers.map(a => a.questionId);
    const correctAnswers = await Question.find({ _id: { $in: questionIds } });

    const score = calculateScore(answers, correctAnswers);

    const result = await Result.create({
      userId,
      recruiterId,
      testId,
      score,
      total: correctAnswers.length
    });

    res.json({
      message: "Evaluation complete!",
      score,
      total: correctAnswers.length,
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error evaluating test" });
  }
};

export const getRecruiterResults = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const results = await Result.find({ recruiterId });
    res.json({ count: results.length, results });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recruiter results" });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId });
    res.json({ count: results.length, results });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user results" });
  }
};
