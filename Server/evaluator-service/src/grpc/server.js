import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const PROTO_PATH = path.join(_dirname, "../../../proto/devhire.proto")
const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
      keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).devhire;

async function EvaluateSubmission(call,callback) {
    try {
        const {testId, userId, recruiterId, answers} = call.request;

        const result = await evaluateAndReturn({ testId, userId, recruiterId, answers });

         callback(null, {
      totalScore: result.totalScore,
      totalQuestions: result.totalQuestions,
      results: result.results.map(r => ({
        questionId: r.questionId,
        correct: r.correct,
        pointsReceived: r.pointsReceived
      }))
    });

    } catch (error) {
         console.error("gRPC EvaluateSubmission error:", err);
    callback({
      code: grpc.status.INTERNAL,
      message: err.message
    });
    }
}

export function startGrpcServer(port = "0.0.0.0:50051") {
  const server = new grpc.Server();
  server.addService(protoDescriptor.EvaluatorService.service, { EvaluateSubmission });
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, portUsed) => {
    if (err) throw err;
    server.start();
    console.log(`Evaluator gRPC server running at ${port}`);
  });
}