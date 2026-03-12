const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  
  pickupLocation: {
    address: { type: String, required: true },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },
  dropoffLocation: {
    address: { type: String, required: true },
    coordinates: { type: [Number], default: [0, 0] }
  },

  distance: { type: Number }, // in km
  estimatedFare: { type: Number, required: true },
  actualFare: { type: Number },
  
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'arrived', 'ongoing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  
  carTypeRequested: { type: String }, // 'Sedan', 'SUV', etc.
  
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date },
  startedAt: { type: Date },
  completedAt: { type: Date }
});

const Ride = mongoose.model('Ride', RideSchema);
module.exports = Ride;
