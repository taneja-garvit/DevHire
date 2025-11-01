import express from "express";
import { evaluateSubmissionGrpc } from "../grpc/evaluatorClient.js";

const router = express.Router();

/**
 * POST /evaluator/:id/submit
 */
router.post("/:id/submit", async (req, res) => {
  try {
    const testId = req.params.id;
    const userId = req.user.id;
    const { answers, recruiterId } = req.body;

    const payload = {
      testId,
      userId,
      recruiterId: recruiterId || "",
      answers: answers.map(a => ({
        questionId: a.questionId,
        selectedIndex: Number(a.selectedIndex)
      }))
    };

    const grpcResp = await evaluateSubmissionGrpc(payload);
    return res.json({ ok: true, data: grpcResp });
  } catch (err) {
    console.error("Evaluator gRPC error:", err);
    return res.status(500).json({ message: "Evaluation failed" });
  }
});

export default router;
