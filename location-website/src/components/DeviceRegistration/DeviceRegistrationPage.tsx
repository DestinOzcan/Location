import React, { useState, useEffect } from 'react';
import './DeviceRegistrationPage.css';

interface DeviceSpecs {
    userAgent: string;
    platform: string;
    language: string;
    screenResolution: string;
    timezone: string;
    cookieEnabled: boolean;
    onlineStatus: boolean;
    connectionType: string;
    memory?: number;
    cores?: number;
}

interface SystemStats {
    cpuUsage: number;
    ramUsage: number;
    temperature: number;
    uptime: number;
}

const DeviceRegistrationPage: React.FC = () => {
    const [deviceSpecs, setDeviceSpecs] = useState<DeviceSpecs | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        deviceType: 'IoT Sensor',
        model: '',
        locationName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Collect device specifications
    useEffect(() => {
        const collectDeviceSpecs = async () => {
            const specs: DeviceSpecs = {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screenResolution: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                cookieEnabled: navigator.cookieEnabled,
                onlineStatus: navigator.onLine,
                connectionType: (navigator as any).connection?.effectiveType || 'unknown'
            };

            // Get additional specs if available
            if ('deviceMemory' in navigator) {
                specs.memory = (navigator as any).deviceMemory;
            }
            if ('hardwareConcurrency' in navigator) {
                specs.cores = navigator.hardwareConcurrency;
            }

            setDeviceSpecs(specs);
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Default to Kingston, ON if location access denied
                        setLocation({ lat: 44.2312, lng: -76.4860 });
                    }
                );
            } else {
                setLocation({ lat: 44.2312, lng: -76.4860 });
            }
        };

        collectDeviceSpecs();
        getLocation();
    }, []);

    // Generate mock system stats
    const generateSystemStats = (): SystemStats => ({
        cpuUsage: Math.floor(Math.random() * 80) + 10, // 10-90%
        ramUsage: Math.floor(Math.random() * 70) + 20, // 20-90%
        temperature: Math.floor(Math.random() * 25) + 30, // 30-55°C
        uptime: Math.random() * 500 // 0-500 hours
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!deviceSpecs || !location) {
            setErrorMessage('Device specs or location not available');
            setRegistrationStatus('error');
            return;
        }

        setIsLoading(true);
        setRegistrationStatus('idle');

        try {
            const registrationData = {
                name: formData.name || `${formData.deviceType} - ${Date.now()}`,
                deviceType: formData.deviceType,
                model: formData.model || `${deviceSpecs.platform} Device`,
                location: formData.locationName || 'Kingston, ON',
                coordinates: location,
                systemStats: generateSystemStats(),
                userAgent: deviceSpecs.userAgent,
                ipAddress: await fetch('https://api.ipify.org?format=json')
                    .then(res => res.json())
                    .then(data => data.ip)
                    .catch(() => 'unknown')
            };

            const response = await fetch('http://localhost:3001/api/devices/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData)
            });

            if (response.ok) {
                setRegistrationStatus('success');
                setFormData({
                    name: '',
                    deviceType: 'IoT Sensor',
                    model: '',
                    locationName: ''
                });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Registration failed');
                setRegistrationStatus('error');
            }
        } catch (error) {
            setErrorMessage('Network error - please check if backend is running');
            setRegistrationStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="device-registration-page">
            <div className="registration-container">
                <div className="page-header">
                    <h1>Device Registration</h1>
                    <p>Register this device to the location tracking system</p>
                </div>

                <div className="content-grid">
                    <div className="device-specs-panel">
                        <h2>Detected Device Specifications</h2>
                        {deviceSpecs ? (
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <strong>Platform:</strong> {deviceSpecs.platform}
                                </div>
                                <div className="spec-item">
                                    <strong>Language:</strong> {deviceSpecs.language}
                                </div>
                                <div className="spec-item">
                                    <strong>Screen:</strong> {deviceSpecs.screenResolution}
                                </div>
                                <div className="spec-item">
                                    <strong>Timezone:</strong> {deviceSpecs.timezone}
                                </div>
                                <div className="spec-item">
                                    <strong>Connection:</strong> {deviceSpecs.connectionType}
                                </div>
                                <div className="spec-item">
                                    <strong>Status:</strong> 
                                    <span className={`status ${deviceSpecs.onlineStatus ? 'online' : 'offline'}`}>
                                        {deviceSpecs.onlineStatus ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                                {deviceSpecs.memory && (
                                    <div className="spec-item">
                                        <strong>Memory:</strong> {deviceSpecs.memory} GB
                                    </div>
                                )}
                                {deviceSpecs.cores && (
                                    <div className="spec-item">
                                        <strong>CPU Cores:</strong> {deviceSpecs.cores}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="loading">Collecting device information...</div>
                        )}

                        {location && (
                            <div className="location-info">
                                <h3>Detected Location</h3>
                                <p><strong>Coordinates:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                            </div>
                        )}
                    </div>

                    <div className="registration-form-panel">
                        <h2>Registration Details</h2>
                        <form onSubmit={handleSubmit} className="registration-form">
                            <div className="form-group">
                                <label htmlFor="name">Device Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter device name (optional)"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="deviceType">Device Type:</label>
                                <select
                                    id="deviceType"
                                    name="deviceType"
                                    value={formData.deviceType}
                                    onChange={handleInputChange}
                                >
                                    <option value="IoT Sensor">IoT Sensor</option>
                                    <option value="Traffic Sensor">Traffic Sensor</option>
                                    <option value="Environmental Sensor">Environmental Sensor</option>
                                    <option value="Security Camera">Security Camera</option>
                                    <option value="Weather Station">Weather Station</option>
                                    <option value="Smart Display">Smart Display</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="model">Model/Version:</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    placeholder="Device model (optional)"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="locationName">Location Description:</label>
                                <input
                                    type="text"
                                    id="locationName"
                                    name="locationName"
                                    value={formData.locationName}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Princess St & Ontario St"
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="register-button"
                                disabled={isLoading || !deviceSpecs || !location}
                            >
                                {isLoading ? 'Registering...' : 'Register Device'}
                            </button>
                        </form>

                        {registrationStatus === 'success' && (
                            <div className="status-message success">
                                ✅ Device registered successfully! It will appear on the map shortly.
                            </div>
                        )}

                        {registrationStatus === 'error' && (
                            <div className="status-message error">
                                ❌ Registration failed: {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceRegistrationPage;