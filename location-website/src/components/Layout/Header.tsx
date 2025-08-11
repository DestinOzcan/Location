import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1>Location Tracker</h1>
                    </Link>
                </div>
                <nav className="nav-links">
                    <Link to="/register" className="register-link">
                        Register Device
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;