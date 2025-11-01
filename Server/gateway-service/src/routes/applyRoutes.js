import express from "express";
import { http } from "../utils/httpClient.js";
import config from "../config/index.js";

const router = express.Router();

/**
 * POST /apply
 * Body:
 *  { jobId: string, skillCategory: string }
 *
 * Flow:
 * 1) Gateway authenticates user and ensures role=developer
 * 2) Gateway calls Assessment-Service to create a test:
 *    POST `${ASSESSMENT_URL}/api/tests` with { candidateId, jobId, skillCategory }
 * 3) Returns testId + questions to frontend
 *
 * NOTE: we do NOT call Job-Service apply endpoint here (optional).
 * If you want job.postedBy/applicants update, add a Job-Service endpoint /api/jobs/:id/apply
 */
router.post("/", async (req, res) => {
  try {
    const { jobId, skillCategory } = req.body;
    const { id: userId } = req.user;

    // build payload for assessment service
    const payload = { candidateId: userId, jobId, skillCategory };

    // call Assessment-Service REST
    const resp = await http.post("/api/tests", payload, {
      // if Assessment has Cors or authentication, add headers here
      // headers: { Authorization: req.headers.authorization }
    });

    // resp.data is { success: true, testId, questions }
    return res.json({ ok: true, data: resp.data });
  } catch (err) {
    console.error("Gateway /apply error:", err.message || err);
    return res.status(500).json({ message: "Failed to create test session" });
  }
});

export default router;
