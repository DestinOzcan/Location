import React from 'react';
import { Device } from '../../types/device';

interface DeviceSpecsProps {
    device: Device;
}

const DeviceSpecs: React.FC<DeviceSpecsProps> = ({ device }) => {
    return (
        <div className="device-specs">
            <h2>{device.name}</h2>
            <p><strong>Model:</strong> {device.model}</p>
            {device.manufacturer && <p><strong>Manufacturer:</strong> {device.manufacturer}</p>}
            {device.specifications && device.specifications.length > 0 && (
                <>
                    <p><strong>Specifications:</strong></p>
                    <ul>
                        {device.specifications.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </>
            )}
            {device.resources && device.resources.length > 0 && (
                <>
                    <p><strong>Resources:</strong></p>
                    <ul>
                        {device.resources.map((resource, index) => (
                            <li key={index}>
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                    {resource.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default DeviceSpecs;