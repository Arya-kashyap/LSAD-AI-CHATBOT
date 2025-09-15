import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/dbConnect.js';
import userRoute from './routes/userRoute.js';
import promptRoute from './routes/promptRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection 
await connectDB();

// Routes
app.use('/api/users', userRoute);
app.use('/api/prompts', promptRoute);

// // Optional: Local dev server
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running locally at http://localhost:${PORT}`);
//   });
// }

// Vercel-compatible export
export default app;
