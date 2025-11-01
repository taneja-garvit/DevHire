import express from "express";
import proxy from "express-http-proxy";
import config from "../config/index.js";

const router = express.Router();

/**
 * Assessment routes proxy
 *  - POST /assessments/ → maps to /api/tests on assessment-service
 *  - GET /assessments/:id → maps to /api/tests/:id
 */
router.use("/", proxy(config.ASSESSMENT_URL, {
  proxyReqPathResolver: function(req) {
    return `/api/tests${req.url}`;
  }
}));

export default router;
