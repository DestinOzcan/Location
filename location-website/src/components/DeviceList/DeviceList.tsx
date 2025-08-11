import React from 'react';
import { Device } from '../../types/device';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
    devices: Device[];
    onDeviceSelect: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onDeviceSelect }) => {
    return (
        <div className="device-list">
            {devices.map(device => (
                <DeviceCard 
                    key={device.id} 
                    device={device} 
                    onSelect={onDeviceSelect}
                />
            ))}
        </div>
    );
};

export default DeviceList;