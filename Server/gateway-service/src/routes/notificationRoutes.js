import express from "express";
import proxy from "express-http-proxy";
import config from "../config/index.js";

const router = express.Router();

/**
 * Notification routes
 *  - POST /notifications/send
 *  - GET /notifications/user/:userId
 */
router.use("/", proxy(config.NOTIFICATION_URL, {
  proxyReqPathResolver: function(req) {
    return `/api/notifications${req.url}`;
  }
}));

export default router;
