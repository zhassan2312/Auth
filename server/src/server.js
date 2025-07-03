import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import connectToDatabase from './utils/database';
import authRouter from './routes/auth.route'


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/auth', authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
connectToDatabase();

});