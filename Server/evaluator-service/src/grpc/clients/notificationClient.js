// This client connects to Notification-Service via gRPC
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "../../../../proto/devhire.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef).devhire;

// Create a client instance to connect to Notification-Service gRPC server
const notificationClient = new grpcObj.NotificationService(
  "localhost:50053", // Notification-Service port
  grpc.credentials.createInsecure()
);

export default notificationClient;
