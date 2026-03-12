const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config.js');
const carRoutes = require('./routes/carRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const driverRoutes = require('./routes/driverRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const path = require('path');

const app = express();

app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow localhost (development)
    if (origin.startsWith('http://localhost')) return callback(null, true);
    // Allow any Vercel deployment (including preview URLs)
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    // Allow the specific production frontend URL if set
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) return callback(null, true);
    // Block everything else
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


// Routes
app.use('/', adminRoutes);
app.use('/', bookingRoutes);
app.use('/', userRoutes);
app.use('/', carRoutes);
app.use('/', driverRoutes);
app.use('/', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT =  8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to DB:', err);
});
