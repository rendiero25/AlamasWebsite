import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import industryRoutes from './routes/industryRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import categoryRoutes from './routes/categoryRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

// Load .env file only in local dev (Vercel uses dashboard env vars)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: true, // Allow all origins (authentication is handled by JWT)
  credentials: true
}));
app.use(express.json());

// Database Connection
let dbConnectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

// Ensure DB is connected before handling any request (important for serverless cold starts)
app.use(async (req, res, next) => {
  try {
    if (!dbConnectionPromise) {
      dbConnectionPromise = connectDB();
    }
    await dbConnectionPromise;
    next();
  } catch (error) {
    dbConnectionPromise = null; // Reset so next request can retry
    return res.status(500).json({ 
      message: 'Database not connected. Please check MONGODB_URI in environment variables.',
      error: error.message 
    });
  }
});

// Routes
app.use('/api/industries', industryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('Alamas Backend API is running');
});

// Start Server only if running directly (not on Vercel)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    // In local dev, connect DB eagerly
    if (process.env.MONGODB_URI) {
        connectDB();
    }
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
