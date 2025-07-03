import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Sample route
app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});