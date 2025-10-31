import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../src/models/Question.js";
import connectDB from "../src/config/db.js";

dotenv.config();
await connectDB();

const questions = [
  {
    questionText: "What is closure in JavaScript?",
    options: [
      "A function inside another function that has access to parent scope",
      "A block scope variable",
      "A way to close variables",
      "A new ES6 feature"
    ],
    correctOptionIndex: 0,
    category: "JS_EASY"
  },
  {
    questionText: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    correctOptionIndex: 1,
    category: "REACT_EASY"
  },
  {
    questionText: "Which command runs a Node.js file?",
    options: ["npm run", "node filename.js", "run node", "execute file"],
    correctOptionIndex: 1,
    category: "NODE_EASY"
  }
];

await Question.insertMany(questions);
console.log("✅ Questions Seeded Successfully!");
process.exit();
