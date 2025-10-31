import connectDB from "./config/db"

dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);

export default app;