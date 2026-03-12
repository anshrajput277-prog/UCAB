const Ride = require("../models/RideSchema");
const Driver = require("../models/DriverSchema");
const Mybookings = require("../models/MyBookingSchema");

// User requests a ride (Estimates fare -> creates pending ride)
const requestRide = async (req, res) => {
    try {
        const {
            selectedPickupState, selectedPickupCity, selectedPickupPincode,
            selectedDropState, selectedDropCity, selectedDropPincode,
            pickupdate, pickuptime, dropdate, droptime,
            userId, userName,
            drivername, carname, cartype, carno, price, fare
        } = req.body;

        const userIdFromToken = req.user.id;

        // Save to MyBookings (what the frontend /mybookings page reads from)
        const booking = new Mybookings({
            selectedPickupState,
            selectedPickupCity,
            selectedDropState,
            selectedDropCity,
            pickupdate,
            pickuptime,
            dropdate,
            droptime,
            drivername: drivername || 'Assigned on pickup',
            fare: fare ? fare.toString() : '0',
            carname: carname || 'Standard Cab',
            cartype: cartype || '',
            carno: carno || '',
            price: price ? price.toString() : '0',
            userId: userIdFromToken,
            userName: userName || '',
        });
        await booking.save();

        res.status(201).json({ message: "Ride booked successfully", booking });
    } catch (err) {
        console.error("Ride Request Error:", err);
        res.status(500).json({ error: 'Failed to request ride', details: err.message });
    }
};

// Driver accepts a pending ride
const acceptRide = async (req, res) => {
    try {
        const { id } = req.params; // Ride ID
        const driverId = req.user.id;

        const ride = await Ride.findById(id);
        if (!ride || ride.status !== 'pending') {
            return res.status(400).json({ message: "Ride no longer available" });
        }

        // Check if driver is online/available
        const driver = await Driver.findById(driverId);
        if (!driver || driver.status !== 'online' || driver.availability !== 'available') {
            return res.status(400).json({ message: "You must be online and available to accept rides" });
        }

        // Update ride
        ride.driverId = driverId;
        ride.status = 'accepted';
        ride.acceptedAt = Date.now();
        await ride.save();

        // Update driver availability
        driver.availability = 'busy';
        await driver.save();

        res.json({ message: "Ride accepted", ride });
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept ride' });
    }
};

// Driver marks ride as started
const startRide = async (req, res) => {
    try {
        const { id } = req.params;
        const driverId = req.user.id;

        const ride = await Ride.findOne({ _id: id, driverId, status: 'accepted' });
        if (!ride) {
            return res.status(404).json({ message: "Valid accepted ride not found" });
        }

        ride.status = 'ongoing';
        ride.startedAt = Date.now();
        await ride.save();

        res.json({ message: "Ride started", ride });
    } catch (err) {
        res.status(500).json({ error: 'Failed to start ride' });
    }
};

// Driver marks ride as completed
const completeRide = async (req, res) => {
    try {
        const { id } = req.params;
        const driverId = req.user.id;

        const ride = await Ride.findOne({ _id: id, driverId, status: 'ongoing' });
        if (!ride) {
            return res.status(404).json({ message: "Valid ongoing ride not found" });
        }

        ride.status = 'completed';
        ride.completedAt = Date.now();
        ride.actualFare = ride.estimatedFare; // Mock actual = estimated for now
        await ride.save();

        // Set driver back to available
        await Driver.findByIdAndUpdate(driverId, { availability: 'available' });

        res.json({ message: "Ride completed", ride });
    } catch (err) {
        res.status(500).json({ error: 'Failed to complete ride' });
    }
};

// Get all pending rides (for drivers to see)
const getPendingRides = async (req, res) => {
    try {
        // Here we could add geospatial querying to only return nearby rides
        const rides = await Ride.find({ status: 'pending' }).populate('userId', 'name');
        res.json(rides);
    } catch (error) {
        res.status(500).send('Server Error fetching pending rides');
    }
};

// Get bookings for a specific user (for /rides/user route)
const getUserRides = async (req, res) => {
    try {
        const userId = req.user.id;
        const rides = await Mybookings.find({ userId }).sort({ bookeddate: -1 });
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user rides' });
    }
};

// Get bookings by userId param (for /getrides/:id route used by frontend)
const getUserBookings = async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Mybookings.find({ userId: id }).sort({ _id: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
    }
};

module.exports = {
    requestRide,
    acceptRide,
    startRide,
    completeRide,
    getPendingRides,
    getUserRides,
    getUserBookings
};