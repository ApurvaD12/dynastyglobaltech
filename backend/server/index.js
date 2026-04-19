const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));
app.use('/api/content', require('./routes/content'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'DynastyGlobalTech API running' }));

const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB Connected');
  await require('./utils/seed')();
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}

if (require.main === module) {
  startServer().catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
}

module.exports = app;
