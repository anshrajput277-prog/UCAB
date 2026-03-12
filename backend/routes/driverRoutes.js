const express = require('express');
const { driverRegister, driverLogin, toggleOnlineStatus, updateLocation } = require('../controllers/driverController.js');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/driver/register', driverRegister);
router.post('/driver/login', driverLogin);
router.put('/driver/status', authMiddleware, authorizeRoles('driver'), toggleOnlineStatus);
router.put('/driver/location', authMiddleware, authorizeRoles('driver'), updateLocation);

module.exports = router;
