import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import connectDB from './lib/database.js';


const app = express();
dotenv.config();

// Middleware - order is important
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Added limit and moved before routes
app.use(express.urlencoded({ extended: true })); // Added for form data
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
connectDB();

});