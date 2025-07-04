import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import connectDB from './lib/database.js';
import session from 'express-session'


const app = express();
dotenv.config();

// Middleware - order is important
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Added limit and moved before routes
app.use(express.urlencoded({ extended: true })); // Added for form data
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET, // A strong, unique secret for signing the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
        secure: true, // Requires HTTPS
        httpOnly: true, // Prevents client-side JavaScript access
        maxAge: 3600000 // Session cookie expiration time in milliseconds (e.g., 1 hour)
    }
}));

// Routes
app.use('/api/auth', authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
connectDB();

});