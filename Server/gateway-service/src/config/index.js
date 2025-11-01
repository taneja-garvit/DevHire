import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,

  // REST service URLs (internal Docker hostnames)
  AUTH_URL: process.env.AUTH_URL || "http://auth-service:5001",
  JOB_URL: process.env.JOB_URL || "http://job-service:5002",
  ASSESSMENT_URL: process.env.ASSESSMENT_URL || "http://assessment-service:5003",
  SCORE_URL: process.env.SCORE_URL || "http://score-service:5005",
  NOTIFICATION_URL: process.env.NOTIFICATION_URL || "http://notification-service:4005",

  // gRPC service
  EVALUATOR_GRPC_URL: process.env.EVALUATOR_GRPC_URL || "evaluator-service:50051"
};
