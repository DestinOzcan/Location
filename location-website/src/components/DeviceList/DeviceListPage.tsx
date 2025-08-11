import React, { useState } from 'react';
import { Device } from '../../types/device';
import useDevices from '../../hooks/useDevices';
import { getGeohashInfo, GeohashInfo } from '../../utils/geohashUtils';
import './DeviceListPage.css';

const DeviceListPage: React.FC = () => {
    const { devices, loading } = useDevices();
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'maintenance'>('all');
    const [geohashInfo, setGeohashInfo] = useState<GeohashInfo | null>(null);

    const filteredDevices = devices.filter(device => {
        if (filterStatus === 'all') return true;
        return device.status === filterStatus;
    });

    const handleDeviceSelect = (device: Device) => {
        setSelectedDevice(device);
        const geoInfo = getGeohashInfo(device.coordinates.lat, device.coordinates.lng, device.geohashPrecision);
        setGeohashInfo(geoInfo);
    };

    if (loading) {
        return <div className="loading">Loading devices...</div>;
    }

    return (
        <div className="device-list-page">
            <div className="page-header">
                <h1>Device Management Dashboard</h1>
                <div className="filter-controls">
                    <label>Filter by Status:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                    >
                        <option value="all">All Devices</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
            </div>

            <div className="devices-grid">
                {filteredDevices.map(device => (
                    <div 
                        key={device.id} 
                        className={`device-card ${device.status} ${selectedDevice?.id === device.id ? 'selected' : ''}`}
                        onClick={() => handleDeviceSelect(device)}
                    >
                        <div className="device-header">
                            <h3>{device.name}</h3>
                            <span className={`status-badge ${device.status}`}>
                                {device.status.toUpperCase()}
                            </span>
                        </div>
                        
                        <div className="device-info">
                            <p><strong>Type:</strong> {device.deviceType}</p>
                            <p><strong>Model:</strong> {device.model}</p>
                            <p><strong>Location:</strong> {device.location}</p>
                            <p><strong>Geohash:</strong> <code>{device.geohash}</code></p>
                        </div>

                        <div className="quick-stats">
                            <div className="stat">
                                <span>CPU:</span>
                                <span className={device.systemStats.cpuUsage > 80 ? 'high' : device.systemStats.cpuUsage > 50 ? 'medium' : 'low'}>
                                    {device.systemStats.cpuUsage}%
                                </span>
                            </div>
                            <div className="stat">
                                <span>RAM:</span>
                                <span className={device.systemStats.ramUsage > 80 ? 'high' : device.systemStats.ramUsage > 50 ? 'medium' : 'low'}>
                                    {device.systemStats.ramUsage}%
                                </span>
                            </div>
                            <div className="stat">
                                <span>Temp:</span>
                                <span className={device.systemStats.temperature > 70 ? 'high' : device.systemStats.temperature > 50 ? 'medium' : 'low'}>
                                    {device.systemStats.temperature}°C
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDevice && geohashInfo && (
                <div className="device-details-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedDevice.name} - Detailed Information</h2>
                            <button onClick={() => setSelectedDevice(null)}>×</button>
                        </div>
                        
                        <div className="detailed-stats">
                            <div className="stats-grid">
                                <div className="stat-group">
                                    <h4>System Performance</h4>
                                    <div className="stat-item">
                                        <span>CPU Usage:</span>
                                        <span>{selectedDevice.systemStats.cpuUsage}%</span>
                                    </div>
                                    <div className="stat-item">
                                        <span>CPU Frequency:</span>
                                        <span>{selectedDevice.systemStats.cpuFrequency || 'N/A'} {selectedDevice.systemStats.cpuFrequency ? 'MHz' : ''}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span>RAM Usage:</span>
                                        <span>
                                            {selectedDevice.systemStats.ramUsed && selectedDevice.systemStats.ramTotal 
                                                ? `${selectedDevice.systemStats.ramUsed}GB / ${selectedDevice.systemStats.ramTotal}GB (${selectedDevice.systemStats.ramUsage}%)`
                                                : `${selectedDevice.systemStats.ramUsage}%`
                                            }
                                        </span>
                                    </div>
                                    <div className="stat-item">
                                        <span>Temperature:</span>
                                        <span>{selectedDevice.systemStats.temperature}°C</span>
                                    </div>
                                </div>

                                <div className="stat-group">
                                    <h4>Geographic Information</h4>
                                    <div className="stat-item">
                                        <span>Geohash:</span>
                                        <span><code>{geohashInfo.hash}</code></span>
                                    </div>
                                    <div className="stat-item">
                                        <span>Precision:</span>
                                        <span>{geohashInfo.precision} chars ({geohashInfo.approximateAccuracy})</span>
                                    </div>
                                    <div className="stat-item">
                                        <span>Coordinates:</span>
                                        <span>{selectedDevice.coordinates.lat.toFixed(6)}, {selectedDevice.coordinates.lng.toFixed(6)}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span>Bounding Box:</span>
                                        <span className="bbox-info">
                                            N: {geohashInfo.bbox.maxLat.toFixed(6)}<br/>
                                            S: {geohashInfo.bbox.minLat.toFixed(6)}<br/>
                                            E: {geohashInfo.bbox.maxLng.toFixed(6)}<br/>
                                            W: {geohashInfo.bbox.minLng.toFixed(6)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="geohash-neighbors">
                                <h4>Geohash Neighbors</h4>
                                <div className="neighbors-grid">
                                    {geohashInfo.neighbors.map((neighbor, index) => (
                                        <code key={index} className="neighbor-hash">{neighbor}</code>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="uptime-info">
                                <h4>System Information</h4>
                                <p><strong>Uptime:</strong> {Math.floor(selectedDevice.systemStats.uptime)} hours</p>
                                <p><strong>Last Updated:</strong> {selectedDevice.systemStats.lastUpdated ? new Date(selectedDevice.systemStats.lastUpdated).toLocaleString() : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceListPage;
