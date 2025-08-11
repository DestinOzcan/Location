import React from 'react';
import { Device } from '../../types/device';
import './DeviceCard.css';

interface DeviceCardProps {
    device: Device;
    onSelect: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onSelect }) => {
    return (
        <div className="device-card" onClick={() => onSelect(device.id)}>
            <h3 className="device-name">{device.name}</h3>
            <p className="device-status">{device.status}</p>
            <p className="device-location">{device.location}</p>
            <button className="view-details">View Details</button>
        </div>
    );
};

export default DeviceCard;