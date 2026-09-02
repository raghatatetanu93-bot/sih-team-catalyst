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

// Middleware MUST come before your routes!
app.use(cors());
app.use(express.json());
app.use('/api/analytics', analyticsRoutes);
// Mounted Routes
app.use('/api/problems', problemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clusters', clusterRoutes); 
app.use('/api/universities', universityRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/projects', projectRoutes);       // <-- ADDED THIS
app.use('/api/milestones', milestoneRoutes);   // <-- MOVED BELOW express.json()

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