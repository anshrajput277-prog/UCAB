const express = require('express');
const { processPayment, getReceipt } = require('../controllers/paymentController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/payments/process', authMiddleware, processPayment);
router.get('/payments/receipt/:rideId', authMiddleware, getReceipt);

module.exports = router;
