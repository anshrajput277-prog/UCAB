const Car = require("../models/CarSchema.js");

// Create a new car with image
 const createCar = async (req, res) => {
  try {
    const { drivername, carname, cartype, carno, price } = req.body;
    const carImage = req.file?.filename; 

    if (!carImage) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const car = new Car({
      drivername,
      carname,
      cartype,
      carno,
      price,
      carImage,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.error("CreateCar Error:", err);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

// Get all cars
 const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Get car by ID using `find`
 const getCarByFind = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.find({ _id: id });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get car' });
  }
};

// Get car by ID using `findById`
const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id);
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update car by ID
 const updateCar = async (req, res) => {
 try {
    const { id } = req.params;
    const { drivername, carname, cartype, carno, price } = req.body;
    const updateData = { drivername, carname, cartype, carno, price };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedCar);
  } catch (err) {
    console.error('UpdateCar Error:', err);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

// Delete car by ID
 const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    await Car.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarByFind,
  getCarById,
  updateCar,
  deleteCar
}