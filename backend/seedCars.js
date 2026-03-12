const mongoose = require('mongoose');
const Car = require('./models/CarSchema');

const MONGO_URI = 'mongodb://127.0.0.1:27017/ucab';

const seedCars = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    const carsToInsert = [
      {
        drivername: "Ramesh Kumar",
        carImage: "1752722496098-1697522230437-thar.webp",
        carname: "Mahindra Thar",
        cartype: "SUV",
        price: "15",
        carno: "DL 01 AB 1234"
      },
      {
        drivername: "Suresh Singh",
        carImage: "1752722688764-1697275111775-swift.webp",
        carname: "Maruti Swift",
        cartype: "Hatchback",
        price: "10",
        carno: "DL 02 CD 5678"
      },
      {
        drivername: "Vikram Sharma",
        carImage: "1752722729275-1697275270986-Hondacity.jpg",
        carname: "Honda City",
        cartype: "Sedan",
        price: "12",
        carno: "DL 03 EF 9012"
      }
    ];

    await Car.insertMany(carsToInsert);
    console.log("Successfully seeded 3 cars");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedCars();
