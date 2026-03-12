const express = require('express');
const { createCar, deleteCar, getAllCars, getCarByFind, getCarById, updateCar } = require('../controllers/carController.js');
const upload = require('../middlewares/multer.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/cars', upload.single('carImage'),authMiddleware, createCar);
router.get('/cars', getAllCars);
router.get('/car/:id', getCarByFind);
router.get('/acar/:id', getCarById);
router.put('/acaredit/:id',authMiddleware,upload.single('image'),updateCar);
router.delete('/cardelete/:id',authMiddleware, deleteCar);

module.exports = router;