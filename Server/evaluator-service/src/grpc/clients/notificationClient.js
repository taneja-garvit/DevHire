// This client connects to Notification-Service via gRPC
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Load the proto file from Docker volume mount
const PROTO_PATH = path.resolve("/proto/devhire.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef).devhire;

// Create a client instance to connect to Notification-Service gRPC server
// Use Docker service name instead of localhost
const notificationClient = new grpcObj.NotificationService(
  "notification-service:50053",
  grpc.credentials.createInsecure()
);

export default notificationClient;
