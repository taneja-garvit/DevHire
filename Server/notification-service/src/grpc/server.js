import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import Notification from "../models/Notification.js";

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

async function SendNotification(call, callback) {
  try {
    const { userId, recruiterId, message } = call.request;
    const doc = await Notification.create({ userId, recruiterId, message });
    callback(null, { ok: true, id: doc._id.toString() });
  } catch (err) {
    console.error("SendNotification error:", err);
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

export function startGrpcServer(port = "0.0.0.0:50053") {
  const server = new grpc.Server();
  server.addService(protoDescriptor.NotificationService.service, { SendNotification });
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, portUsed) => {
    if (err) throw err;
    server.start();
    console.log(`Notification gRPC server running at ${port}`);
  });
}
