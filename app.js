import express from "express";
const app = express();
import 'dotenv/config'
const PORT = process.env.PORT;

// Set view engine to use EJS
app.set('view engine', 'ejs')

// Import routers
import apiRouter from './routes/apiRoutes.js'


app.get('/', (req, res) => {
    try {
        res.render('index')
    } catch (error) {
        console.error(error);
    }
});

app.use('/api', apiRouter);



app.listen(PORT || 3000, (err) => {
  if (err) console.error(`Error running server: ${err}`);
  console.log(`Server running on port ${PORT}`);
});
