const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Car = require('./models/CarSchema');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI not loaded from .env');
  process.exit(1);
}

console.log('Connecting to MongoDB Atlas...');

const seedMoreCars = async () => {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB Atlas Connected for Seeding');

    const newCars = [
      {
        drivername: 'Anil Mehta',
        carImage: '1752722765073-1697276747734-etios.webp',
        carname: 'Toyota Etios',
        cartype: 'Sedan',
        price: '11',
        carno: 'MH 04 GH 3456',
      },
      {
        drivername: 'Deepak Yadav',
        carImage: '1752722804856-1711333435644-fortuner-trd-660[1].jpg',
        carname: 'Toyota Fortuner',
        cartype: 'SUV',
        price: '20',
        carno: 'KA 05 IJ 7890',
      },
      {
        drivername: 'Rajiv Nair',
        carImage: '1773284158503-ferrari.webp',
        carname: 'Ferrari Roma',
        cartype: 'Luxury',
        price: '50',
        carno: 'MH 01 ZZ 0001',
      },
      {
        drivername: 'Sanjay Gupta',
        carImage: '1752722861820-1696964006271-Screenshot 2023-09-28 113059.png',
        carname: 'Tata Nexon EV',
        cartype: 'Electric SUV',
        price: '13',
        carno: 'DL 06 KL 2345',
      },
      {
        drivername: 'Pradeep Joshi',
        carImage: '1773283982150-lambo.jpg',
        carname: 'Lamborghini Urus',
        cartype: 'Luxury SUV',
        price: '60',
        carno: 'MH 02 YY 9999',
      },
      {
        drivername: 'Mohan Das',
        carImage: '1753784381419-Screenshot 2025-07-25 at 11.10.04 PM.png',
        carname: 'Hyundai Creta',
        cartype: 'SUV',
        price: '14',
        carno: 'TN 07 MN 6789',
      },
    ];

    const result = await Car.insertMany(newCars);
    console.log('Successfully seeded ' + result.length + ' new cars');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedMoreCars();
