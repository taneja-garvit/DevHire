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
    questionText: "What is JSX in React?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
    correctOptionIndex: 0,
    category: "REACT_EASY"
  },
  {
    questionText: "What does useState return in React?",
    options: ["An object", "An array with state and setter", "A function", "A number"],
    correctOptionIndex: 1,
    category: "REACT_EASY"
  },
  {
    questionText: "What is the virtual DOM in React?",
    options: ["A copy of the real DOM", "A database", "A server", "A component"],
    correctOptionIndex: 0,
    category: "REACT_EASY"
  },
  {
    questionText: "Which method is used to create components in React?",
    options: ["React.createComponent", "React.createElement", "React.component", "React.makeComponent"],
    correctOptionIndex: 1,
    category: "REACT_EASY"
  },
  {
    questionText: "What is props in React?",
    options: ["Properties passed to components", "State variables", "Functions", "CSS classes"],
    correctOptionIndex: 0,
    category: "REACT_EASY"
  },
  {
    questionText: "How do you create a functional component?",
    options: ["class MyComponent", "function MyComponent()", "component MyComponent", "new Component"],
    correctOptionIndex: 1,
    category: "REACT_EASY"
  },
  {
    questionText: "What is React.Fragment used for?",
    options: ["Group elements without extra DOM node", "Create animations", "Style components", "Manage state"],
    correctOptionIndex: 0,
    category: "REACT_EASY"
  },
  {
    questionText: "What does useEffect do?",
    options: ["Manages state", "Handles side effects", "Creates components", "Updates props"],
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

// Clear existing questions first to avoid duplicates
await Question.deleteMany({});
console.log("🗑️  Cleared old questions");

await Question.insertMany(questions);
console.log("✅ Questions Seeded Successfully!");
process.exit();
