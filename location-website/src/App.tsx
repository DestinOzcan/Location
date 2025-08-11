import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MapContainer from './components/Map/MapContainer';
import DeviceListPage from './components/DeviceList/DeviceListPage';
import DeviceSpecifications from './components/DeviceSpecifications/DeviceSpecifications';
import SystemStatistics from './components/SystemStatistics/SystemStatistics';
import DeviceRegistrationPage from './components/DeviceRegistration/DeviceRegistrationPage';
import Footer from './components/Layout/Footer';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="app-layout">
                    <Routes>
                        <Route path="/register" element={<DeviceRegistrationPage />} />
                        <Route path="/*" element={
                            <>
                                <Sidebar />
                                <main className="main-content">
                                    <Routes>
                                        <Route path="/" element={<MapContainer />} />
                                        <Route path="/devices" element={<DeviceListPage />} />
                                        <Route path="/specifications" element={<DeviceSpecifications />} />
                                        <Route path="/statistics" element={<SystemStatistics />} />
                                    </Routes>
                                </main>
                            </>
                        } />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;