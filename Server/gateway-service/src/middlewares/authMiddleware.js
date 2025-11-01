import jwt from "jsonwebtoken";
import config from "../config/index.js";

/**
 * JWT middleware:
 * - expects header Authorization: Bearer <token>
 * - verifies token with JWT_SECRET
 * - attaches req.user = { id, role } (as encoded in token)
 *
 * NOTE: In production you might call Auth-Service to verify tokens.
 */
export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // decoded must include id and role per Auth-Service token generation
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * Developer-only middleware
 */
export function requireDeveloper(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "developer")
    return res.status(403).json({ message: "Only developers allowed" });
  next();
}
