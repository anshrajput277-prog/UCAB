const express = require('express');
const { adminLogin, adminRegister } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/alogin', adminLogin);
router.post('/aregister', adminRegister);

module.exports = router;
