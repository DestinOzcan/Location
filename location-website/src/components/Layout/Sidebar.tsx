import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <h2>Device Management</h2>
            <nav>
                <ul>
                    <li>
                        <Link 
                            to="/" 
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            🗺️ Map View
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/devices" 
                            className={location.pathname === '/devices' ? 'active' : ''}
                        >
                            📱 Device List
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/specifications" 
                            className={location.pathname === '/specifications' ? 'active' : ''}
                        >
                            ⚙️ Device Specifications
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/system-stats" 
                            className={location.pathname === '/system-stats' ? 'active' : ''}
                        >
                            📊 System Statistics
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div className="sidebar-info">
                <h3>Quick Stats</h3>
                <div className="quick-stats">
                    <div className="stat-item">
                        <span className="stat-label">Total Devices:</span>
                        <span className="stat-value">3</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Online:</span>
                        <span className="stat-value online">2</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Offline:</span>
                        <span className="stat-value offline">1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;