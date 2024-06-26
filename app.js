import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";
import "dotenv/config";

// Creating app instance
const app = express();

const PORT = process.env.PORT;

// Set view engine to use EJS
app.set("view engine", "ejs");

// Setup middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Configure the session middleware
app.use(
  session({
    secret: process.env.APP_SECRET, // Change this to a long, random string
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV }, // Set secure: true if using HTTPS
  })
);

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Import routers
import apiRouter from "./routes/apiRoutes.js";
import authRouter from "./routes/authRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import facultyRouter from "./routes/facultyRoutes.js";

// Home route
app.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

// API routes
app.use("/api", apiRouter);

// Auth Routes
app.use("/auth", authRouter);

// Student Routes
app.use("/student", studentRouter);

// Faculty Routes
app.use("/faculty", facultyRouter);

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(PORT || 3000, (err) => {
  if (err) console.error(`Error running server: ${err}`);
  console.log(`Server running on port ${PORT}`);
});
