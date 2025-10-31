require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { verifyToken, getTokenFromRequest } = require('../lib/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth middleware
const requireAuth = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Routes
app.use('/api/income', requireAuth, require('./routes/income'));
app.use('/api/expenses', requireAuth, require('./routes/expenses'));
app.use('/api/goals', requireAuth, require('./routes/goals'));
app.use('/api/investments', requireAuth, require('./routes/investments'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', requireAuth, require('./routes/user'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});