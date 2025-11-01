import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  ASSESSMENT_URL: process.env.ASSESSMENT_URL,
  JOB_URL: process.env.JOB_URL,
  EVALUATOR_GRPC_URL: process.env.EVALUATOR_GRPC_URL
};
