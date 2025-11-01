import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import Score from "../models/Score.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Load proto from Docker volume mount
const PROTO_PATH = path.resolve("/proto/devhire.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).devhire;

async function SaveScore(call, callback) {
  try {
    const { userId, recruiterId, testId, score, total } = call.request;
    const doc = await Score.create({ userId, recruiterId, testId, score, total });
    callback(null, { resultId: doc._id.toString(), ok: true });
  } catch (err) {
    console.error("SaveScore error:", err);
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

export function startGrpcServer(port = "0.0.0.0:50052") {
  const server = new grpc.Server();
  server.addService(protoDescriptor.ScoreService.service, { SaveScore });
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, portUsed) => {
    if (err) throw err;
    server.start();
    console.log(`Score gRPC server running at ${port}`);
  });
}
