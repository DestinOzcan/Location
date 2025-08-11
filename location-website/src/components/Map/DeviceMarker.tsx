import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Device } from '../../types/device';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export interface DeviceMarkerProps {
    device: Device;
}

const DeviceMarker: React.FC<DeviceMarkerProps> = ({ device }) => {
    // Create custom icon based on device status
    const getMarkerIcon = (status: string) => {
        const iconColor = status === 'online' ? 'green' : status === 'offline' ? 'red' : 'orange';
        
        return new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    };

    return (
        <Marker
            position={[device.coordinates.lat, device.coordinates.lng]}
            icon={getMarkerIcon(device.status)}
        >
            <Popup>
                <div className="device-popup">
                    <h3>{device.name}</h3>
                    <div className={`status-indicator ${device.status}`}>
                        Status: {device.status.toUpperCase()}
                    </div>
                    <div className="device-details">
                        <p><strong>Type:</strong> {device.deviceType}</p>
                        <p><strong>Model:</strong> {device.model}</p>
                        <p><strong>Location:</strong> {device.location}</p>
                        <p><strong>Geohash:</strong> <code>{device.geohash}</code></p>
                    </div>
                    <div className="system-stats">
                        <div className="stat-row">
                            <span>CPU: {device.systemStats.cpuUsage}%</span>
                            <span>RAM: {device.systemStats.ramUsage}%</span>
                        </div>
                        <div className="stat-row">
                            <span>Temp: {device.systemStats.temperature}°C</span>
                            <span>Uptime: {Math.floor(device.systemStats.uptime)}h</span>
                        </div>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default DeviceMarker;