const Payment = require("../models/PaymentSchema");
const Ride = require("../models/RideSchema");

// Create payment for a completed ride
const processPayment = async (req, res) => {
    try {
        const { rideId, paymentMethod } = req.body;
        const userId = req.user.id;

        const ride = await Ride.findById(rideId);
        if (!ride || ride.userId.toString() !== userId) {
            return res.status(404).json({ message: "Ride not found or access denied" });
        }

        if (ride.status !== 'completed') {
            return res.status(400).json({ message: "Ride is not completed yet" });
        }

        // Mock payment processing success
        const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

        const payment = new Payment({
            rideId,
            userId,
            driverId: ride.driverId,
            amount: ride.actualFare || ride.estimatedFare,
            status: 'completed',
            paymentMethod,
            transactionId
        });

        await payment.save();
        res.status(201).json({ message: "Payment successful", payment });
    } catch (error) {
        console.error("Payment Processing Error:", error);
        res.status(500).json({ error: "Failed to process payment" });
    }
};

const getReceipt = async (req, res) => {
    try {
        const { rideId } = req.params;
        const payment = await Payment.findOne({ rideId }).populate('rideId userId driverId');
        
        if (!payment) {
            return res.status(404).json({ message: "Payment receipt not found" });
        }

        res.json({ receipt: payment });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch receipt" });
    }
};

module.exports = {
    processPayment,
    getReceipt
};
