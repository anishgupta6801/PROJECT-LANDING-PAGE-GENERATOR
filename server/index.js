import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import pagesRoutes from './routes/pages.js';
import generateRoutes from './routes/generate.js';
import exportRoutes from './routes/export.js';
import deployRoutes from './routes/deploy.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for root path
app.get('/', (req, res) => {
  res.json({
    message: 'Landing Page Generator API Server',
    status: 'running',
    endpoints: [
      'GET /api/pages',
      'POST /api/generate',
      'POST /api/export',
      'POST /api/deploy'
    ],
    openai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured'
  });
});

// Routes
app.use('/api/pages', pagesRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/deploy', deployRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// Database connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected');
    } else {
      console.log('No MongoDB URI provided, running without database');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB if URI is provided
    if (process.env.MONGODB_URI) {
      await connectDB();
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();