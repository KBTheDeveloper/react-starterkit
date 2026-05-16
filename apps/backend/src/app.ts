import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import Sentry, { initSentry } from './config/sentry.js';
import fileRoutes from './routes/fileRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

// Initialize Sentry before any other middleware
initSentry();


const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your dev frontend URL
    credentials: true,               // ✅ allows cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/jobs', jobRoutes);

Sentry.setupExpressErrorHandler(app);

export default app;
