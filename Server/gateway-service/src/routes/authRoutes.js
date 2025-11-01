import express from "express";
import proxy from "express-http-proxy";
import config from "../config/index.js";

const router = express.Router();

/**
 * Auth routes - direct proxy to Auth-Service
 * Examples:
 *  POST /auth/signup → auth-service:5001/auth/signup
 *  POST /auth/login  → auth-service:5001/auth/login
 *  GET  /auth/me     → auth-service:5001/auth/me
 */
router.use("/", proxy(config.AUTH_URL, {
  proxyReqPathResolver: function(req) {
    return `/auth${req.url}`;
  }
}));

export default router;
