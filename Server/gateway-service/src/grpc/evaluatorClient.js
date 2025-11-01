// gRPC client wrapper for EvaluatorService
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load proto definition (assumes root proto/devhire.proto)
const PROTO_PATH = path.join(process.cwd(), "../proto/devhire.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const proto = grpc.loadPackageDefinition(packageDef).devhire;

// create client instance
const evaluatorClient = new proto.EvaluatorService(
  config.EVALUATOR_GRPC_URL,
  grpc.credentials.createInsecure()
);

/**
 * Call EvaluateSubmission RPC.
 * payload should match proto EvaluateRequest:
 * { testId: string, userId: string, recruiterId: string, answers: [{ questionId, selectedIndex }] }
 */
export function evaluateSubmissionGrpc(payload) {
  return new Promise((resolve, reject) => {
    evaluatorClient.EvaluateSubmission(payload, (err, response) => {
      if (err) return reject(err);
      resolve(response);
    });
  });
}

export default evaluatorClient;
