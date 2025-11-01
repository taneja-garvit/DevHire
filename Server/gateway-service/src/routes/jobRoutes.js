import express from "express";
import proxy from "express-http-proxy";
import config from "../config/index.js";

const router = express.Router();

/**
 * Job routes proxy
 *  - GET /jobs/
 *  - GET /jobs/:id
 *  - POST /jobs/ (admin only)
 */
router.use("/", proxy(config.JOB_URL, {
  proxyReqPathResolver: function(req) {
    return `/api/jobs${req.url}`;
  }
}));

export default router;
