import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Sample route
app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});