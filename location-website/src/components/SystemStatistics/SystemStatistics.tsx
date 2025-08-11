import React from 'react';
import './SystemStatistics.css';
import useDevices from '../../hooks/useDevices';

const SystemStatistics: React.FC = () => {
    const { devices, loading } = useDevices();

    if (loading) {
        return <div className="loading">Loading system statistics...</div>;
    }

    const onlineCount = devices.filter(d => d.status === 'online').length;
    const offlineCount = devices.filter(d => d.status === 'offline').length;
    const maintenanceCount = devices.filter(d => d.status === 'maintenance').length;

    return (
        <div className="system-statistics">
            <div className="page-header">
                <h1>System Statistics</h1>
                <p>Real-time performance metrics and system health overview</p>
            </div>

            <div className="stats-overview">
                <div className="overview-card">
                    <h3>Device Status Overview</h3>
                    <div className="status-grid">
                        <div className="status-item online">
                            <span className="status-count">{onlineCount}</span>
                            <span className="status-label">Online</span>
                        </div>
                        <div className="status-item offline">
                            <span className="status-count">{offlineCount}</span>
                            <span className="status-label">Offline</span>
                        </div>
                        <div className="status-item maintenance">
                            <span className="status-count">{maintenanceCount}</span>
                            <span className="status-label">Maintenance</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="device-stats-grid">
                {devices.map((device) => (
                    <div key={device.id} className="device-stat-card">
                        <div className="device-stat-header">
                            <h4>{device.name}</h4>
                            <span className={`device-status ${device.status}`}>
                                {device.status.toUpperCase()}
                            </span>
                        </div>
                        
                        <div className="device-metrics">
                            <div className="metric">
                                <span className="metric-label">CPU</span>
                                <span className="metric-value">{device.systemStats.cpuUsage}%</span>
                            </div>
                            <div className="metric">
                                <span className="metric-label">RAM</span>
                                <span className="metric-value">{device.systemStats.ramUsage}%</span>
                            </div>
                            <div className="metric">
                                <span className="metric-label">Temp</span>
                                <span className="metric-value">{device.systemStats.temperature}°C</span>
                            </div>
                            <div className="metric">
                                <span className="metric-label">Uptime</span>
                                <span className="metric-value">{Math.floor(device.systemStats.uptime)}h</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemStatistics;
