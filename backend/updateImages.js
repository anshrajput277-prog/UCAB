require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/CarSchema');

const MONGO_URI = process.env.MONGO_URI;

const updateImages = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Atlas Connected for Updating Images');

    const update1 = await Car.updateOne(
      { carname: 'Tata Nexon EV' },
      { $set: { carImage: 'nexon_ev.png' } }
    );
    console.log('Tata Nexon EV updated:', update1.modifiedCount);

    const update2 = await Car.updateOne(
      { carname: 'Hyundai Creta' },
      { $set: { carImage: 'hyundai_creta.png' } }
    );
    console.log('Hyundai Creta updated:', update2.modifiedCount);

    mongoose.connection.close();
    console.log('Done.');
  } catch (error) {
    console.error('Update error:', error);
    process.exit(1);
  }
};

updateImages();
