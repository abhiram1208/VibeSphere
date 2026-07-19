require("dotenv").config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Import Routes
const authRoutes = require('./routes/auth.routes');

// Post routes (we just created this)
const postRoutes = require('./routes/post.routes');

const app = express();

// ======================
// Global Middleware
// ======================
app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://vibespherehub.netlify.app"
  ],
  credentials: true,
}));


app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// API Routes
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ======================
// Health Check
// ======================
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: "VibeSphere API is running successfully! 🚀" 
  });
});

// ======================
// Global Error Handler
// ======================
app.use(errorHandler);

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

