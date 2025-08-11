const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to store device data
const DEVICES_FILE = path.join(__dirname, 'devices.json');

// Initialize devices file if it doesn't exist
const initializeDevicesFile = async () => {
    try {
        await fs.access(DEVICES_FILE);
    } catch (error) {
        // File doesn't exist, create it with initial data
        const initialDevices = [
            {
                id: "device-001",
                name: "Traffic Sensor Alpha",
                status: "online",
                coordinates: { lat: 44.2312, lng: -76.4860 },
                systemStats: { cpuUsage: 45, ramUsage: 60, temperature: 42, uptime: 168.5 },
                geohash: "f244c0b2cc2c",
                deviceType: "Traffic Sensor",
                model: "TS-2000X",
                location: "Princess St & Ontario St",
                lastSeen: new Date().toISOString(),
                ipAddress: "192.168.1.100",
                userAgent: "TrafficSensor/1.0",
                manufacturer: "TechSensor Inc.",
                specifications: [
                    "Wireless connectivity: WiFi 802.11n",
                    "Power: Solar panel with battery backup",
                    "Range: 100m detection radius",
                    "Weather resistant: IP67 rating"
                ],
                resources: [
                    { name: "User Manual", link: "https://example.com/manual" },
                    { name: "API Documentation", link: "https://example.com/api" }
                ]
            },
            {
                id: "device-002",
                name: "Environmental Monitor Beta",
                status: "online",
                coordinates: { lat: 44.2280, lng: -76.4951 },
                systemStats: { cpuUsage: 25, ramUsage: 40, temperature: 38, uptime: 240.2 },
                geohash: "f244c0b1a8b1",
                deviceType: "Environmental Sensor",
                model: "ENV-500",
                location: "Queen's University Campus",
                lastSeen: new Date().toISOString(),
                ipAddress: "192.168.1.101",
                userAgent: "EnvironmentalSensor/2.1",
                manufacturer: "EcoTech Solutions",
                specifications: [
                    "Sensors: Temperature, Humidity, Air Quality",
                    "Data logging: 1000 readings storage",
                    "Connectivity: LoRaWAN",
                    "Battery life: 2 years"
                ],
                resources: [
                    { name: "Setup Guide", link: "https://example.com/setup" },
                    { name: "Calibration Tool", link: "https://example.com/calibration" }
                ]
            },
            {
                id: "device-003",
                name: "Security Camera Gamma",
                status: "offline",
                coordinates: { lat: 44.2350, lng: -76.4800 },
                systemStats: { cpuUsage: 80, ramUsage: 85, temperature: 55, uptime: 72.1 },
                geohash: "f244c0b4d5e2",
                deviceType: "Security Camera",
                model: "SC-HD-Pro",
                location: "City Hall Area",
                lastSeen: new Date(Date.now() - 3600000).toISOString(),
                ipAddress: "192.168.1.102",
                userAgent: "SecurityCamera/3.0",
                manufacturer: "SecureVision Corp",
                specifications: [
                    "Resolution: 4K Ultra HD",
                    "Night vision: 50m infrared range",
                    "Storage: 1TB local storage",
                    "Streaming: H.264 compression"
                ],
                resources: [
                    { name: "Installation Guide", link: "https://example.com/install" },
                    { name: "Mobile App", link: "https://example.com/mobile" }
                ]
            }
        ];
        await fs.writeFile(DEVICES_FILE, JSON.stringify(initialDevices, null, 2));
    }
};

// Helper function to read devices
const readDevices = async () => {
    try {
        const data = await fs.readFile(DEVICES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading devices:', error);
        return [];
    }
};

// Helper function to write devices
const writeDevices = async (devices) => {
    try {
        await fs.writeFile(DEVICES_FILE, JSON.stringify(devices, null, 2));
    } catch (error) {
        console.error('Error writing devices:', error);
    }
};

// Generate unique device ID
const generateDeviceId = () => {
    return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// API Routes

// Get all devices
app.get('/api/devices', async (req, res) => {
    try {
        const devices = await readDevices();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch devices' });
    }
});

// Register a new device
app.post('/api/devices/register', async (req, res) => {
    try {
        const {
            name,
            deviceType,
            model,
            location,
            coordinates,
            systemStats,
            userAgent,
            ipAddress
        } = req.body;

        // Validate required fields
        if (!name || !deviceType || !coordinates) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, deviceType, coordinates' 
            });
        }

        const devices = await readDevices();
        
        // Generate geohash (simplified version)
        const geohash = `f244c${Math.random().toString(36).substr(2, 8)}`;
        
        const newDevice = {
            id: generateDeviceId(),
            name,
            status: 'online',
            coordinates,
            systemStats: systemStats || {
                cpuUsage: Math.floor(Math.random() * 100),
                ramUsage: Math.floor(Math.random() * 100),
                temperature: Math.floor(Math.random() * 30) + 30,
                uptime: Math.random() * 1000
            },
            geohash,
            deviceType,
            model: model || 'Unknown',
            location: location || 'Unknown Location',
            lastSeen: new Date().toISOString(),
            ipAddress: ipAddress || req.ip,
            userAgent: userAgent || req.get('User-Agent')
        };

        devices.push(newDevice);
        await writeDevices(devices);

        res.status(201).json({
            message: 'Device registered successfully',
            device: newDevice
        });
    } catch (error) {
        console.error('Error registering device:', error);
        res.status(500).json({ error: 'Failed to register device' });
    }
});

// Update device status/stats
app.put('/api/devices/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const devices = await readDevices();
        const deviceIndex = devices.findIndex(device => device.id === id);

        if (deviceIndex === -1) {
            return res.status(404).json({ error: 'Device not found' });
        }

        devices[deviceIndex] = {
            ...devices[deviceIndex],
            ...updates,
            lastSeen: new Date().toISOString()
        };

        await writeDevices(devices);

        res.json({
            message: 'Device updated successfully',
            device: devices[deviceIndex]
        });
    } catch (error) {
        console.error('Error updating device:', error);
        res.status(500).json({ error: 'Failed to update device' });
    }
});

// Delete device
app.delete('/api/devices/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const devices = await readDevices();
        const filteredDevices = devices.filter(device => device.id !== id);

        if (filteredDevices.length === devices.length) {
            return res.status(404).json({ error: 'Device not found' });
        }

        await writeDevices(filteredDevices);
        res.json({ message: 'Device deleted successfully' });
    } catch (error) {
        console.error('Error deleting device:', error);
        res.status(500).json({ error: 'Failed to delete device' });
    }
});

// Initialize and start server
const startServer = async () => {
    await initializeDevicesFile();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API available at http://localhost:${PORT}/api`);
    });
};

startServer();