import express from "express";
import proxy from "express-http-proxy";
import config from "../config/index.js";

const router = express.Router();

/**
 * Score routes
 *  - POST /scores/save
 *  - GET /scores/user/:userId
 *  - GET /scores/recruiter/:recruiterId
 */
router.use("/", proxy(config.SCORE_URL, {
  proxyReqPathResolver: function(req) {
    return `/api/scores${req.url}`;
  }
}));

export default router;
