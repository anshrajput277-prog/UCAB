const express = require('express');
const { requestRide, acceptRide, startRide, completeRide, getPendingRides, getUserRides, getUserBookings, cancelRide, removeHistory } = require('../controllers/bookingController.js');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// User routes
router.post('/rides', authMiddleware, requestRide);
router.get('/rides/user', authMiddleware, getUserRides);
router.get('/getrides/:id', authMiddleware, getUserBookings);
router.delete('/cancelride/:id', authMiddleware, cancelRide);
router.delete('/removehistory/:id', authMiddleware, removeHistory);

// Driver routes
router.get('/rides/pending', authMiddleware, authorizeRoles('driver'), getPendingRides);
router.put('/rides/:id/accept', authMiddleware, authorizeRoles('driver'), acceptRide);
router.put('/rides/:id/start', authMiddleware, authorizeRoles('driver'), startRide);
router.put('/rides/:id/complete', authMiddleware, authorizeRoles('driver'), completeRide);

module.exports = router;
