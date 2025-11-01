// This client connects to Score-Service via gRPC
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the proto file
const PROTO_PATH = path.join(__dirname, "../../../../proto/devhire.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef).devhire;

// Create a client instance to connect to Score-Service gRPC server
const scoreClient = new grpcObj.ScoreService(
  "localhost:50052", // Score-Service port
  grpc.credentials.createInsecure()
);

export default scoreClient;
