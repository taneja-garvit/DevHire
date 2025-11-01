import Question from "../models/Question.js";
import Result from "../models/Result.js";
import { calculateScore } from "../utils/calculateScore.js";
import scoreClient from "../grpc/clients/scoreClient.js";
import notificationClient from "../grpc/clients/notificationClient.js";

export const evaluateTest = async (req, res) => {
  try {
    const { userId, testId, recruiterId, answers } = req.body;

    const questionIds = answers.map(a => a.questionId);
    const correctAnswers = await Question.find({ _id: { $in: questionIds } });

    const score = calculateScore(answers, correctAnswers);

    // ✅ gRPC CALL #1 — Save Score in ScoreService
    const scoreRequest = {
      userId,
      recruiterId,
      testId,
      score,
      total: correctAnswers.length,
    };

    scoreClient.SaveScore(scoreRequest, (err, response) => {
      if (err) console.error("❌ Error calling ScoreService:", err);
      else console.log("✅ ScoreService Response:", response.message);
    });

    // ✅ gRPC CALL #2 — Send Notification
    const notificationRequest = {
      userId,
      recruiterId,
      message: `Developer ${userId} completed test ${testId} with score ${score}/${correctAnswers.length}`,
    };

    notificationClient.SendNotification(notificationRequest, (err, response) => {
      if (err) console.error("❌ Error calling NotificationService:", err);
      else console.log("✅ NotificationService Response:", response.message);
    });

    // ✅ Save locally too (optional redundancy)
    const result = await Result.create({
      userId,
      recruiterId,
      testId,
      score,
      total: correctAnswers.length,
    });

    res.json({
      message: "Evaluation complete!",
      score,
      total: correctAnswers.length,
      result,
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
