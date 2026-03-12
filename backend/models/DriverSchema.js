const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    licenseNumber: { type: String },
    vehicle: {
        type: { type: String, enum: ['Sedan', 'SUV', 'Hatchback', 'Luxury'] },
        model: { type: String },
        registrationNumber: { type: String },
        capacity: { type: Number, default: 4 }
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
    },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    availability: { type: String, enum: ['available', 'busy'], default: 'available' },
    createdAt: { type: Date, default: Date.now },
});

// Create a geospatial index for finding nearby drivers
DriverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
