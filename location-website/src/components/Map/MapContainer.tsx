import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapContainer.css';
import DeviceMarker from './DeviceMarker';
import useDevices from '../../hooks/useDevices';
import { MapBounds } from '../../types/device';

// Component to handle map events
const MapEventHandler = ({ onBoundsChange }: { onBoundsChange: (bounds: MapBounds, zoom: number) => void }) => {
    const map = useMapEvents({
        moveend: () => {
            const bounds = map.getBounds();
            const zoom = map.getZoom();
            const mapBounds: MapBounds = {
                north: bounds.getNorth(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                west: bounds.getWest()
            };
            onBoundsChange(mapBounds, zoom);
        },
        zoomend: () => {
            const bounds = map.getBounds();
            const zoom = map.getZoom();
            const mapBounds: MapBounds = {
                north: bounds.getNorth(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                west: bounds.getWest()
            };
            onBoundsChange(mapBounds, zoom);
        }
    });
    return null;
};

const MapContainer: React.FC = () => {
    const { devices, loading } = useDevices();
    const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null);
    const [currentZoom, setCurrentZoom] = useState<number>(13);

    const handleBoundsChange = (bounds: MapBounds, zoom: number) => {
        setCurrentBounds(bounds);
        setCurrentZoom(zoom);
    };

    if (loading) {
        return <div className="loading">Loading map...</div>;
    }

    // Kingston, Ontario coordinates
    const kingstonCenter: [number, number] = [44.2312, -76.4860];

    return (
        <div className="map-container">
            <LeafletMap
                center={kingstonCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                <MapEventHandler onBoundsChange={handleBoundsChange} />
                
                {devices.map((device) => (
                    <DeviceMarker
                        key={device.id}
                        device={device}
                    />
                ))}
            </LeafletMap>

            {currentBounds && (
                <div className="map-info-panel">
                    <h3>Map Information</h3>
                    <p><strong>Zoom Level:</strong> {currentZoom}</p>
                    <p><strong>Devices Visible:</strong> {devices.length}</p>
                    <div className="bounds-info">
                        <h4>Current View Bounds:</h4>
                        <p>North: {currentBounds.north.toFixed(6)}</p>
                        <p>South: {currentBounds.south.toFixed(6)}</p>
                        <p>East: {currentBounds.east.toFixed(6)}</p>
                        <p>West: {currentBounds.west.toFixed(6)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapContainer;