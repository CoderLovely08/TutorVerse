import express from "express";
import bodyParser from "body-parser";
import multer from 'multer'
import 'dotenv/config'


// Creating app instance
const app = express();

const PORT = process.env.PORT;

// Set view engine to use EJS
app.set('view engine', 'ejs')

// Setup middlewares
app.use(express.json());
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Import routers
import apiRouter from './routes/apiRoutes.js'
import authRouter from './routes/authRoutes.js'

// Home route
app.get('/', (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        console.error(error);
    }
});

// API routes
app.use('/api', apiRouter);

// Auth Routes
app.use('/auth', authRouter)



app.listen(PORT || 3000, (err) => {
  if (err) console.error(`Error running server: ${err}`);
  console.log(`Server running on port ${PORT}`);
});
