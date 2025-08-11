import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <p>&copy; {new Date().getFullYear()} Location Tracker</p>
                    <div className="footer-subtitle">Real-time device monitoring and location tracking</div>
                </div>
                <div className="footer-right">
                    <div className="footer-links">
                        <a href="#about">About</a>
                        <a href="#help">Help</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="status-indicator">
                        <div className="status-dot"></div>
                        <span>System Online</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;