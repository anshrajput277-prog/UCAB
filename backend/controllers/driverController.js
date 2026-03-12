const Driver = require("../models/DriverSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// Driver logic mapping
const driverRegister = async (req, res) => {
    try {
        const { name, email, password, licenseNumber, phone, vehicleModel, vehicleRegistrationNumber, vehicleType } = req.body;
        
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ message: "Driver already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const driver = await Driver.create({
            name,
            email,
            password: hashedPassword,
            phone,
            licenseNumber,
            vehicle: {
                model: vehicleModel,
                registrationNumber: vehicleRegistrationNumber,
                type: vehicleType
            }
        });

        res.status(201).json({ message: "Driver registered successfully" });
    } catch (error) {
        console.error("Driver Registration Error:", error);
        res.status(500).json({ error: "Failed to register driver" });
    }
};

const driverLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const driver = await Driver.findOne({ email });

        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, driver.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: driver._id, email: driver.email, role: 'driver' },
            process.env.JWT_SECRET,
            { expiresIn: "10h" } // Longer session for drivers
        );

        res.json({
            status: "Success",
            token,
            driver: {
                id: driver._id,
                name: driver.name,
                email: driver.email,
                status: driver.status,
                availability: driver.availability
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const toggleOnlineStatus = async (req, res) => {
    try {
        const driverId = req.user.id; // From authMiddleware
        const { status, coordinates } = req.body; // status: 'online' or 'offline', coordinates: [lng, lat]

        const driver = await Driver.findById(driverId);
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        driver.status = status;
        if (coordinates && coordinates.length === 2) {
            driver.location = { type: 'Point', coordinates };
        }
        await driver.save();

        res.json({ message: `Status updated to ${status}`, driver });
    } catch (error) {
        res.status(500).json({ error: "Failed to update status" });
    }
};

const updateLocation = async (req, res) => {
    try {
        const driverId = req.user.id;
        const { coordinates } = req.body;

        await Driver.findByIdAndUpdate(driverId, {
            location: { type: 'Point', coordinates }
        });

        res.json({ message: "Location updated" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update location" });
    }
};

module.exports = {
    driverRegister,
    driverLogin,
    toggleOnlineStatus,
    updateLocation
};
