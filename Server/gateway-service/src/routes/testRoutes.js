import express from "express";
import { evaluateSubmissionGrpc } from "../grpc/evaluatorClient.js";

const router = express.Router();

/**
 * POST /tests/:id/submit
 * Body:
 *  { answers: [{ questionId, selectedIndex }], recruiterId? optional }
 *
 * Flow:
 * 1) JWT verified, req.user present
 * 2) Build payload: { testId, userId, recruiterId, answers }
 * 3) Call EvaluatorService via gRPC (EvaluateSubmission)
 * 4) Return gRPC response to frontend
 */
router.post("/:id/submit", async (req, res) => {
  try {
    const testId = req.params.id;
    const userId = req.user.id;
    const { answers, recruiterId } = req.body;

    // Ensure answers are integer selectedIndex etc.
    const payload = {
      testId,
      userId,
      recruiterId: recruiterId || "", // keep empty if not provided
      // proto expects repeated Answer: where Answer has questionId and selectedIndex
      answers: answers.map(a => ({
        questionId: a.questionId,
        selectedIndex: Number(a.selectedIndex)
      }))
    };

    // Call evaluator via gRPC
    const grpcResp = await evaluateSubmissionGrpc(payload);
    // grpcResp should match EvaluateResponse (totalScore, totalQuestions, results)
    return res.json({ ok: true, data: grpcResp });
  } catch (err) {
    console.error("Gateway submit error:", err);
    // gRPC errors can be objects; sanitize message
    const msg = err?.message || err;
    return res.status(500).json({ message: "Evaluation failed", error: msg });
  }
});

export default router;
