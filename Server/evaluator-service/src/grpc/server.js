import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import { calculateScore } from "../utils/calculateScore.js";
import scoreClient from "./clients/scoreClient.js";
import notificationClient from "./clients/notificationClient.js";

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

// Load proto from Docker volume mount
const PROTO_PATH = path.resolve("/proto/devhire.proto")
const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
      keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).devhire;

// Helper function to evaluate submission
async function evaluateAndReturn({ testId, userId, recruiterId, answers }) {
  console.log("\n🔍 === EVALUATE AND RETURN DEBUG ===");
  console.log("📝 Answers received:", JSON.stringify(answers, null, 2));
  
  const questionIds = answers.map(a => a.questionId);
  console.log("🆔 Question IDs to search:", questionIds);
  
  // Check total questions in DB first
  const totalInDb = await Question.countDocuments({});
  console.log("📊 Total questions in DB:", totalInDb);
  
  // Check if specific IDs exist
  const correctAnswers = await Question.find({ _id: { $in: questionIds } });
  console.log("✅ Found correct answers:", correctAnswers.length);
  console.log("📋 Found IDs:", correctAnswers.map(q => q._id.toString()));
  console.log("===================================\n");

  const score = calculateScore(answers, correctAnswers);

  // Save score via gRPC to ScoreService
  const scoreRequest = {
    userId,
    recruiterId,
    testId,
    score,
    total: correctAnswers.length,
  };

  scoreClient.SaveScore(scoreRequest, (err, response) => {
    if (err) console.error("❌ Error calling ScoreService:", err);
    else console.log("✅ ScoreService Response:", response);
  });

  // Send notification via gRPC to NotificationService
  const notificationRequest = {
    userId,
    recruiterId,
    message: `Developer ${userId} completed test ${testId} with score ${score}/${correctAnswers.length}`,
  };

  notificationClient.SendNotification(notificationRequest, (err, response) => {
    if (err) console.error("❌ Error calling NotificationService:", err);
    else console.log("✅ NotificationService Response:", response);
  });

  // Save locally
  await Result.create({
    userId,
    recruiterId,
    testId,
    score,
    total: correctAnswers.length,
  });

  // Calculate detailed results
  const results = answers.map((ans) => {
    const question = correctAnswers.find(q => q._id.toString() === ans.questionId);
    const correct = question && question.correctOptionIndex === ans.selectedIndex;
    return {
      questionId: ans.questionId,
      correct: correct,
      pointsReceived: correct ? 1 : 0
    };
  });

  return {
    totalScore: score,
    totalQuestions: correctAnswers.length,
    results
  };
}

async function EvaluateSubmission(call, callback) {
    try {
        const {testId, userId, recruiterId, answers} = call.request;

        const result = await evaluateAndReturn({ testId, userId, recruiterId, answers });

        callback(null, {
          totalScore: result.totalScore,
          totalQuestions: result.totalQuestions,
          results: result.results.map(r => ({
            questionId: r.questionId,
            correct: r.correct,
            pointsReceived: r.pointsReceived
          }))
        });

    } catch (error) {
        console.error("gRPC EvaluateSubmission error:", error);
        callback({
          code: grpc.status.INTERNAL,
          message: error.message
        });
    }
}

export function startGrpcServer(port = "0.0.0.0:50051") {
  const server = new grpc.Server();
  server.addService(protoDescriptor.EvaluatorService.service, { EvaluateSubmission });
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, portUsed) => {
    if (err) throw err;
    server.start();
    console.log(`Evaluator gRPC server running at ${port}`);
  });
}