import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors


dotenv.config();
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware
app.use(cors());

// Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});