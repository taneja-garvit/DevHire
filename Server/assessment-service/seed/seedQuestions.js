import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../src/models/Question.js";
import connectDB from "../src/config/db.js";

dotenv.config();
await connectDB();

const questions = [
  // ========================= REACT =========================
  {
    questionText: "What is JSX in React?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
    correctOptionIndex: 0,
    category: "REACT"
  },
  {
    questionText: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    correctOptionIndex: 1,
    category: "REACT"
  },
  {
    questionText: "What does useState return in React?",
    options: ["An object", "An array with state and setter", "A function", "A number"],
    correctOptionIndex: 1,
    category: "REACT"
  },
  {
    questionText: "What is props in React?",
    options: ["Properties passed to components", "State variables", "Functions", "CSS classes"],
    correctOptionIndex: 0,
    category: "REACT"
  },
  {
    questionText: "What is the purpose of React.Fragment?",
    options: ["Group elements without extra DOM node", "Create animations", "Style components", "Manage state"],
    correctOptionIndex: 0,
    category: "REACT"
  },

  // ========================= JAVASCRIPT =========================
  {
    questionText: "What is closure in JavaScript?",
    options: [
      "A function inside another function that has access to parent scope",
      "A block scope variable",
      "A way to close variables",
      "A new ES6 feature"
    ],
    correctOptionIndex: 0,
    category: "JAVASCRIPT"
  },
  {
    questionText: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "Object.parse()", "parse.JSON()"],
    correctOptionIndex: 0,
    category: "JAVASCRIPT"
  },
  {
    questionText: "What keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "both let and const"],
    correctOptionIndex: 3,
    category: "JAVASCRIPT"
  },
  {
    questionText: "What does 'this' keyword refer to in JavaScript?",
    options: ["The current function", "The global object or current context", "Parent function", "The prototype"],
    correctOptionIndex: 1,
    category: "JAVASCRIPT"
  },
  {
    questionText: "Which method adds elements to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctOptionIndex: 0,
    category: "JAVASCRIPT"
  },

  // ========================= NODE =========================
  {
    questionText: "Which command runs a Node.js file?",
    options: ["npm run", "node filename.js", "run node", "execute file"],
    correctOptionIndex: 1,
    category: "NODE"
  },
  {
    questionText: "Which module is used to create a server in Node.js?",
    options: ["http", "fs", "url", "os"],
    correctOptionIndex: 0,
    category: "NODE"
  },
  {
    questionText: "Which keyword is used to import modules in Node.js (CommonJS)?",
    options: ["import", "include", "require", "use"],
    correctOptionIndex: 2,
    category: "NODE"
  },
  {
    questionText: "Which method is used to read files in Node.js?",
    options: ["fs.read()", "fs.readFile()", "read.file()", "fileSystem.read()"],
    correctOptionIndex: 1,
    category: "NODE"
  },
  {
    questionText: "What does npm stand for?",
    options: ["Node Package Manager", "New Project Manager", "Node Program Manager", "Network Package Module"],
    correctOptionIndex: 0,
    category: "NODE"
  },

  // ========================= PYTHON =========================
  {
    questionText: "What keyword defines a function in Python?",
    options: ["def", "func", "function", "lambda"],
    correctOptionIndex: 0,
    category: "PYTHON"
  },
  {
    questionText: "Which of the following is a mutable data type in Python?",
    options: ["tuple", "string", "list", "int"],
    correctOptionIndex: 2,
    category: "PYTHON"
  },
  {
    questionText: "How do you start a comment in Python?",
    options: ["//", "/*", "#", "--"],
    correctOptionIndex: 2,
    category: "PYTHON"
  },
  {
    questionText: "Which function is used to display output in Python?",
    options: ["echo()", "display()", "print()", "show()"],
    correctOptionIndex: 2,
    category: "PYTHON"
  },
  {
    questionText: "What does the len() function do?",
    options: ["Returns length of an object", "Counts only numbers", "Measures file size", "Checks type of variable"],
    correctOptionIndex: 0,
    category: "PYTHON"
  },

  // ========================= JAVA =========================
  {
    questionText: "Which keyword is used to inherit a class in Java?",
    options: ["this", "extends", "implements", "inherits"],
    correctOptionIndex: 1,
    category: "JAVA"
  },
  {
    questionText: "What is JVM in Java?",
    options: ["Java Variable Machine", "Java Virtual Machine", "Java Verified Module", "Joint Virtual Manager"],
    correctOptionIndex: 1,
    category: "JAVA"
  },
  {
    questionText: "Which method is the entry point of a Java program?",
    options: ["start()", "main()", "init()", "run()"],
    correctOptionIndex: 1,
    category: "JAVA"
  },
  {
    questionText: "What is the size of int in Java?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on system"],
    correctOptionIndex: 1,
    category: "JAVA"
  },
  {
    questionText: "Which collection class does not allow duplicates?",
    options: ["List", "Map", "Set", "ArrayList"],
    correctOptionIndex: 2,
    category: "JAVA"
  },

  // ========================= MONGO =========================
  {
    questionText: "What type of database is MongoDB?",
    options: ["Relational", "Graph", "Document-oriented", "Key-value"],
    correctOptionIndex: 2,
    category: "MONGO"
  },
  {
    questionText: "Which command shows all databases in MongoDB shell?",
    options: ["show databases", "list dbs", "display dbs", "get dbs"],
    correctOptionIndex: 0,
    category: "MONGO"
  },
  {
    questionText: "Which data format does MongoDB use to store documents?",
    options: ["XML", "JSON", "BSON", "CSV"],
    correctOptionIndex: 2,
    category: "MONGO"
  },
  {
    questionText: "What command inserts one document in a collection?",
    options: ["insert()", "insertOne()", "add()", "createDoc()"],
    correctOptionIndex: 1,
    category: "MONGO"
  },
  {
    questionText: "Which method is used to update a document in MongoDB?",
    options: ["updateOne()", "modify()", "change()", "edit()"],
    correctOptionIndex: 0,
    category: "MONGO"
  },

  // ========================= GOLANG =========================
  {
    questionText: "What keyword is used to define a function in Go?",
    options: ["func", "function", "def", "lambda"],
    correctOptionIndex: 0,
    category: "GOLANG"
  },
  {
    questionText: "Which symbol is used for short variable declaration in Go?",
    options: ["=", ":=", "=>", "<-"],
    correctOptionIndex: 1,
    category: "GOLANG"
  },
  {
    questionText: "What package is used for formatted I/O in Go?",
    options: ["fmt", "io", "input", "scan"],
    correctOptionIndex: 0,
    category: "GOLANG"
  },
  {
    questionText: "Which keyword is used for concurrency in Go?",
    options: ["thread", "async", "goroutine", "parallel"],
    correctOptionIndex: 2,
    category: "GOLANG"
  },
  {
    questionText: "What is the default value of an uninitialized int in Go?",
    options: ["null", "undefined", "0", "nil"],
    correctOptionIndex: 2,
    category: "GOLANG"
  },
   {
    questionText: "What is TypeScript?",
    options: ["A superset of JavaScript", "A framework", "A library", "A database"],
    correctOptionIndex: 0,
    category: "TYPESCRIPT"
  },
  {
    questionText: "Which keyword defines an interface in TypeScript?",
    options: ["type", "interface", "struct", "class"],
    correctOptionIndex: 1,
    category: "TYPESCRIPT"
  },
  {
    questionText: "Which file extension is used for TypeScript files?",
    options: [".js", ".jsx", ".ts", ".tsx"],
    correctOptionIndex: 2,
    category: "TYPESCRIPT"
  },

  // ========================= HTML =========================
  {
    questionText: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "High Transfer Markup Language"],
    correctOptionIndex: 1,
    category: "HTML"
  },
  {
    questionText: "Which tag is used for the largest heading?",
    options: ["<head>", "<h6>", "<h1>", "<header>"],
    correctOptionIndex: 2,
    category: "HTML"
  },
  {
    questionText: "Which attribute is used to provide an alternate text for an image?",
    options: ["alt", "src", "title", "href"],
    correctOptionIndex: 0,
    category: "HTML"
  },

  // ========================= CSS =========================
  {
    questionText: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    correctOptionIndex: 0,
    category: "CSS"
  },
  {
    questionText: "Which property changes the text color in CSS?",
    options: ["text-color", "font-color", "color", "background-color"],
    correctOptionIndex: 2,
    category: "CSS"
  },
  {
    questionText: "Which CSS property is used to control spacing between elements?",
    options: ["margin", "padding", "border", "spacing"],
    correctOptionIndex: 0,
    category: "CSS"
  },

  // ========================= NEXTJS =========================
  {
    questionText: "What is Next.js primarily used for?",
    options: ["Server-side rendering", "Database management", "Mobile app development", "Game development"],
    correctOptionIndex: 0,
    category: "NEXTJS"
  },
  {
    questionText: "Which folder in Next.js holds API routes?",
    options: ["/api", "/pages/api", "/routes", "/endpoints"],
    correctOptionIndex: 1,
    category: "NEXTJS"
  },
  {
    questionText: "Which command starts a Next.js development server?",
    options: ["next start", "npm run dev", "next run", "start next"],
    correctOptionIndex: 1,
    category: "NEXTJS"
  },

  // ========================= EXPRESS =========================
  {
    questionText: "What is Express.js?",
    options: ["A web application framework for Node.js", "A database", "A templating engine", "A CLI tool"],
    correctOptionIndex: 0,
    category: "EXPRESS"
  },
  {
    questionText: "Which method handles GET requests in Express?",
    options: ["app.get()", "app.post()", "app.fetch()", "app.use()"],
    correctOptionIndex: 0,
    category: "EXPRESS"
  },
  {
    questionText: "Which object holds request parameters in Express?",
    options: ["req.body", "req.params", "req.query", "res.params"],
    correctOptionIndex: 1,
    category: "EXPRESS"
  },

  // ========================= POSTGRESQL =========================
  {
    questionText: "What type of database is PostgreSQL?",
    options: ["Relational", "NoSQL", "Graph", "Key-value"],
    correctOptionIndex: 0,
    category: "POSTGRESQL"
  },
  {
    questionText: "Which command lists all databases in PostgreSQL?",
    options: ["SHOW DATABASES;", "\\l", "LIST DATABASES;", "GET DATABASES;"],
    correctOptionIndex: 1,
    category: "POSTGRESQL"
  },
  {
    questionText: "Which data type is used to store textual data in PostgreSQL?",
    options: ["TEXT", "VARCHAR", "CHAR", "All of these"],
    correctOptionIndex: 3,
    category: "POSTGRESQL"
  },

  // ========================= MYSQL =========================
  {
    questionText: "Which SQL command retrieves data from a table?",
    options: ["SELECT", "GET", "FETCH", "EXTRACT"],
    correctOptionIndex: 0,
    category: "MYSQL"
  },
  {
    questionText: "What is the default port for MySQL?",
    options: ["3306", "8080", "5432", "1521"],
    correctOptionIndex: 0,
    category: "MYSQL"
  },
  {
    questionText: "Which statement is used to insert new data in MySQL?",
    options: ["ADD", "INSERT INTO", "CREATE", "UPDATE"],
    correctOptionIndex: 1,
    category: "MYSQL"
  },

  // ========================= REDIS =========================
  {
    questionText: "Redis is primarily used for what?",
    options: ["Caching", "Logging", "File storage", "Email"],
    correctOptionIndex: 0,
    category: "REDIS"
  },
  {
    questionText: "What data structure is supported by Redis?",
    options: ["Lists", "Sets", "Strings", "All of these"],
    correctOptionIndex: 3,
    category: "REDIS"
  },
  {
    questionText: "Which command stores a key-value pair in Redis?",
    options: ["SET", "PUT", "ADD", "INSERT"],
    correctOptionIndex: 0,
    category: "REDIS"
  },

  // ========================= DOCKER =========================
  {
    questionText: "What is Docker used for?",
    options: ["Containerization", "Virtualization", "Monitoring", "Deployment automation only"],
    correctOptionIndex: 0,
    category: "DOCKER"
  },
  {
    questionText: "Which command lists all running Docker containers?",
    options: ["docker ps", "docker list", "docker show", "docker status"],
    correctOptionIndex: 0,
    category: "DOCKER"
  },
  {
    questionText: "What file defines how a Docker image is built?",
    options: ["docker-compose.yml", "Dockerfile", "image.json", "build.yaml"],
    correctOptionIndex: 1,
    category: "DOCKER"
  },

  // ========================= KUBERNETES =========================
  {
    questionText: "What is a Pod in Kubernetes?",
    options: ["The smallest deployable unit", "A container", "A cluster", "A node"],
    correctOptionIndex: 0,
    category: "KUBERNETES"
  },
  {
    questionText: "Which command shows running pods?",
    options: ["kubectl get pods", "kubectl pods", "kubectl list pods", "kube pods"],
    correctOptionIndex: 0,
    category: "KUBERNETES"
  },
  {
    questionText: "What does kubelet do?",
    options: ["Manages containers on a node", "Schedules pods", "Builds images", "Creates clusters"],
    correctOptionIndex: 0,
    category: "KUBERNETES"
  },

  // ========================= AWS =========================
  {
    questionText: "What does AWS stand for?",
    options: ["Amazon Web Services", "Advanced Web System", "Amazon Web Solutions", "Automated Web Server"],
    correctOptionIndex: 0,
    category: "AWS"
  },
  {
    questionText: "Which AWS service is used for object storage?",
    options: ["S3", "EC2", "RDS", "Lambda"],
    correctOptionIndex: 0,
    category: "AWS"
  },
  {
    questionText: "Which AWS service runs serverless functions?",
    options: ["Lambda", "EC2", "Elastic Beanstalk", "CloudWatch"],
    correctOptionIndex: 0,
    category: "AWS"
  },

  // ========================= AZURE =========================
  {
    questionText: "What is Microsoft Azure?",
    options: ["A cloud computing platform", "A database", "A text editor", "A hardware service"],
    correctOptionIndex: 0,
    category: "AZURE"
  },
  {
    questionText: "Which Azure service provides virtual machines?",
    options: ["Azure VM", "Azure Compute", "Azure Storage", "Azure Blob"],
    correctOptionIndex: 0,
    category: "AZURE"
  },
  {
    questionText: "Which tool is used to manage Azure resources via command line?",
    options: ["Azure CLI", "PowerShell", "Azure Manager", "CLI Hub"],
    correctOptionIndex: 0,
    category: "AZURE"
  },

  // ========================= GCP =========================
  {
    questionText: "What does GCP stand for?",
    options: ["Google Cloud Platform", "Global Cloud Provider", "Google Compute Project", "General Cloud Platform"],
    correctOptionIndex: 0,
    category: "GCP"
  },
  {
    questionText: "Which GCP service provides object storage?",
    options: ["Cloud Storage", "Compute Engine", "BigQuery", "Firebase"],
    correctOptionIndex: 0,
    category: "GCP"
  },
  {
    questionText: "Which command-line tool manages GCP resources?",
    options: ["gcloud", "google-cli", "gc-tool", "gcompute"],
    correctOptionIndex: 0,
    category: "GCP"
  },

  // ========================= GRAPHQL =========================
  {
    questionText: "What is GraphQL primarily used for?",
    options: ["API querying", "Database storage", "UI rendering", "Authentication"],
    correctOptionIndex: 0,
    category: "GRAPHQL"
  },
  {
    questionText: "Which company developed GraphQL?",
    options: ["Facebook", "Google", "Twitter", "Microsoft"],
    correctOptionIndex: 0,
    category: "GRAPHQL"
  },
  {
    questionText: "What is a resolver in GraphQL?",
    options: ["A function that resolves query data", "An authentication token", "A cache system", "A mutation type"],
    correctOptionIndex: 0,
    category: "GRAPHQL"
  },

  // ========================= RESTAPI =========================
  {
    questionText: "What does REST stand for?",
    options: ["Representational State Transfer", "Remote Service Transfer", "Resource State Token", "Request Session Token"],
    correctOptionIndex: 0,
    category: "RESTAPI"
  },
  {
    questionText: "Which HTTP method is used to create a resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctOptionIndex: 1,
    category: "RESTAPI"
  },
  {
    questionText: "What format is most commonly used in REST APIs?",
    options: ["XML", "JSON", "CSV", "YAML"],
    correctOptionIndex: 1,
    category: "RESTAPI"
  },

  // ========================= SASS =========================
  {
    questionText: "What does SASS stand for?",
    options: ["Syntactically Awesome Style Sheets", "Simple Advanced Style System", "Style and Script Sheet", "Styled Advanced Syntax"],
    correctOptionIndex: 0,
    category: "SASS"
  },
  {
    questionText: "Which symbol defines a variable in SASS?",
    options: ["$", "@", "#", "&"],
    correctOptionIndex: 0,
    category: "SASS"
  },
  {
    questionText: "Which file extension is used for SASS files?",
    options: [".sass", ".scss", ".css", "both .sass and .scss"],
    correctOptionIndex: 3,
    category: "SASS"
  },

  // ========================= VITE =========================
  {
    questionText: "What is Vite used for?",
    options: ["Frontend build tool", "Database", "Web server", "Testing framework"],
    correctOptionIndex: 0,
    category: "VITE"
  },
  {
    questionText: "Which command starts a Vite development server?",
    options: ["vite", "npm run dev", "vite start", "start vite"],
    correctOptionIndex: 1,
    category: "VITE"
  },
  {
    questionText: "Vite is written primarily in which language?",
    options: ["JavaScript", "TypeScript", "Rust", "Go"],
    correctOptionIndex: 1,
    category: "VITE"
  },

  // ========================= WEBPACK =========================
  {
    questionText: "What is Webpack?",
    options: ["A module bundler", "A compiler", "A task runner", "A framework"],
    correctOptionIndex: 0,
    category: "WEBPACK"
  },
  {
    questionText: "What file defines Webpack configuration?",
    options: ["webpack.config.js", "webpackfile.js", "config.webpack.js", "webpack.json"],
    correctOptionIndex: 0,
    category: "WEBPACK"
  },
  {
    questionText: "Which concept in Webpack loads files other than JavaScript?",
    options: ["Loaders", "Plugins", "Bundles", "Assets"],
    correctOptionIndex: 0,
    category: "WEBPACK"
  },

  // ========================= VUE =========================
  {
    questionText: "Who created Vue.js?",
    options: ["Evan You", "Dan Abramov", "Brendan Eich", "Ryan Dahl"],
    correctOptionIndex: 0,
    category: "VUE"
  },
  {
    questionText: "What directive binds data in Vue.js?",
    options: ["v-bind", "v-data", "bind", "data-bind"],
    correctOptionIndex: 0,
    category: "VUE"
  },
  {
    questionText: "Which command creates a new Vue project?",
    options: ["vue create", "npm vue init", "create-vue-app", "vue new"],
    correctOptionIndex: 0,
    category: "VUE"
  },

  // ========================= ANGULAR =========================
  {
    questionText: "Angular is written primarily in which language?",
    options: ["TypeScript", "JavaScript", "Dart", "C#"],
    correctOptionIndex: 0,
    category: "ANGULAR"
  },
  {
    questionText: "Which command creates a new Angular project?",
    options: ["ng new", "angular create", "create-angular", "ng start"],
    correctOptionIndex: 0,
    category: "ANGULAR"
  },
  {
    questionText: "Which decorator defines a component in Angular?",
    options: ["@Component", "@Module", "@Directive", "@Injectable"],
    correctOptionIndex: 0,
    category: "ANGULAR"
  },

  // ========================= FLASK =========================
  {
    questionText: "What is Flask in Python?",
    options: ["A web framework", "A database", "A package manager", "A template engine"],
    correctOptionIndex: 0,
    category: "FLASK"
  },
  {
    questionText: "Which method handles HTTP requests in Flask?",
    options: ["@app.route()", "@route()", "@flask.get()", "@flask.handler()"],
    correctOptionIndex: 0,
    category: "FLASK"
  },
  {
    questionText: "Flask is built on top of which WSGI toolkit?",
    options: ["Werkzeug", "Gunicorn", "Django", "Tornado"],
    correctOptionIndex: 0,
    category: "FLASK"
  },

  // ========================= DJANGO =========================
  {
    questionText: "What is Django?",
    options: ["A Python web framework", "A database", "A JavaScript library", "An IDE"],
    correctOptionIndex: 0,
    category: "DJANGO"
  },
  {
    questionText: "Which command creates a new Django project?",
    options: ["django-admin startproject", "django new", "create-django", "python manage.py newproject"],
    correctOptionIndex: 0,
    category: "DJANGO"
  },
  {
    questionText: "Which file defines URL routes in Django?",
    options: ["urls.py", "routes.py", "views.py", "app.py"],
    correctOptionIndex: 0,
    category: "DJANGO"
  },

  // ========================= TAILWIND =========================
  {
    questionText: "What is Tailwind CSS?",
    options: ["A utility-first CSS framework", "A JavaScript library", "A template engine", "A CMS"],
    correctOptionIndex: 0,
    category: "TAILWIND"
  },
  {
    questionText: "Which file stores Tailwind configuration?",
    options: ["tailwind.config.js", "config.tailwind.js", "tw.config.js", "style.config.js"],
    correctOptionIndex: 0,
    category: "TAILWIND"
  },
  {
    questionText: "Which command builds Tailwind CSS?",
    options: ["npx tailwindcss build", "tailwind build", "npm run tailwind", "tw build"],
    correctOptionIndex: 0,
    category: "TAILWIND"
  },

  // ========================= FIGMA =========================
  {
    questionText: "What is Figma used for?",
    options: ["UI/UX design", "Coding", "3D rendering", "Video editing"],
    correctOptionIndex: 0,
    category: "FIGMA"
  },
  {
    questionText: "Figma designs are primarily created using which shapes?",
    options: ["Vector shapes", "Raster images", "Bitmaps", "3D models"],
    correctOptionIndex: 0,
    category: "FIGMA"
  },
  {
    questionText: "What is a Figma component?",
    options: ["A reusable design element", "A page", "A plugin", "A layer style"],
    correctOptionIndex: 0,
    category: "FIGMA"
  }
];


// Clear existing questions first to avoid duplicates
await Question.deleteMany({});
console.log("🗑️  Cleared old questions");

await Question.insertMany(questions);
console.log("✅ Questions Seeded Successfully!");
process.exit();
