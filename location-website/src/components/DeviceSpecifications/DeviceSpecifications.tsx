/* filepath: c:\Users\desti\OneDrive\Desktop\LocateDevice\location-website\src\components\DeviceSpecifications\DeviceSpecifications.tsx */
import React from 'react';
import './DeviceSpecifications.css';
import DeviceSpecs from '../DeviceList/DeviceSpecs';
import useDevices from '../../hooks/useDevices';

const DeviceSpecifications: React.FC = () => {
    const { devices, loading } = useDevices();

    if (loading) {
        return <div className="loading">Loading device specifications...</div>;
    }

    return (
        <div className="device-specifications-page">
            <div className="page-header">
                <h1>All Device Specifications</h1>
                <p>Detailed specifications for all registered devices</p>
            </div>

            <div className="specs-container">
                {devices.map((device) => (
                    <div key={device.id} className="spec-card">
                        <DeviceSpecs device={device} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceSpecifications;