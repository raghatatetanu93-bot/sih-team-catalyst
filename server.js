const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Route Imports
const problemRoutes = require('./src/routes/problemRoutes');
const authRoutes = require('./src/routes/authRoutes');
const clusterRoutes = require('./src/routes/clusterRoutes'); 
const universityRoutes = require('./src/routes/universityRoutes');
const partnerRoutes = require('./src/routes/partnerRoutes');
const projectRoutes = require('./src/routes/projectRoutes');     // <-- ADDED THIS
const milestoneRoutes = require('./src/routes/milestoneRoutes'); 
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration for Production & Local Development
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://solvesphere-three.vercel.app',
  'https://solvesphere.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1');

      if (isAllowed || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Role'],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check & Root Endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'SolveSphere API',
    status: 'running',
    health: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  }[dbState] || 'Unknown';

  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      connected: dbState === 1,
    },
  });
});

app.use('/api/analytics', analyticsRoutes);
// Mounted Routes
app.use('/api/problems', problemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clusters', clusterRoutes); 
app.use('/api/universities', universityRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/milestones', milestoneRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

if (require.main === module) {
    startServer();
}

module.exports = app;