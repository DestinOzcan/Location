import React, { useState } from 'react';
import { Device } from '../../types/device';
import './AreaOfInterestPanel.css';

interface AreaInfo {
    center: { lat: number; lng: number };
    deviceCount: number;
    zoomLevel: number;
    bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
}

interface AreaOfInterestPanelProps {
    areaInfo: AreaInfo | null;
    devicesInArea: Device[];
}

const AreaOfInterestPanel: React.FC<AreaOfInterestPanelProps> = ({ areaInfo, devicesInArea }) => {
    const [expandedDevice, setExpandedDevice] = useState<string | null>(null);

    if (!areaInfo) {
        return (
            <div className="area-panel">
                <h3>Area of Interest</h3>
                <p>Move or zoom the map to see devices in the current area</p>
            </div>
        );
    }

    const toggleDeviceExpansion = (deviceId: string) => {
        setExpandedDevice(expandedDevice === deviceId ? null : deviceId);
    };

    return (
        <div className="area-panel">
            <div className="area-info">
                <h3>Current Area of Interest</h3>
                <div className="area-stats">
                    <p><strong>Devices Found:</strong> {areaInfo.deviceCount}</p>
                    <p><strong>Zoom Level:</strong> {areaInfo.zoomLevel}</p>
                    <p><strong>Center:</strong> {areaInfo.center.lat.toFixed(4)}, {areaInfo.center.lng.toFixed(4)}</p>
                </div>
            </div>

            <div className="devices-in-area">
                <h4>Devices in Current View</h4>
                {devicesInArea.length === 0 ? (
                    <p className="no-devices">No devices in current area</p>
                ) : (
                    <div className="device-list-area">
                        {devicesInArea.map(device => (
                            <div key={device.id} className="device-item">
                                <div 
                                    className="device-header"
                                    onClick={() => toggleDeviceExpansion(device.id)}
                                >
                                    <h5>{device.name}</h5>
                                    <span className={`status ${device.status}`}>{device.status}</span>
                                    <button className="expand-btn">
                                        {expandedDevice === device.id ? '−' : '+'}
                                    </button>
                                </div>
                                
                                {expandedDevice === device.id && (
                                    <div className="device-details">
                                        <p><strong>Model:</strong> {device.model}</p>
                                        <p><strong>Manufacturer:</strong> {device.manufacturer}</p>
                                        <p><strong>Location:</strong> {device.location}</p>
                                        
                                        <div className="device-resources">
                                            <h6>Resources:</h6>
                                            {!device.resources || device.resources.length === 0 ? (
                                                <p>No resources available</p>
                                            ) : (
                                                <ul>
                                                    {device.resources.map((resource, index) => (
                                                        <li key={index}>
                                                            <a 
                                                                href={resource.link} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className={`resource-link ${resource.type || ''}`}
                                                            >
                                                                {resource.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AreaOfInterestPanel;