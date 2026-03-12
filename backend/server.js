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
  origin: ['http://localhost:5173','http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
