import app from "./app.js";
import config from "./config/index.js";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
  console.log(`Assessment URL: ${config.ASSESSMENT_URL}, Evaluator gRPC: ${config.EVALUATOR_GRPC_URL}`);
});
