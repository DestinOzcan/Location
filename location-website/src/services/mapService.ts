import { useEffect, useState } from 'react';
import { Location } from '../types/device';

const MAP_API_URL = process.env.REACT_APP_MAP_API_URL || 'http://localhost:3001/api';

export const fetchDeviceLocations = async (radius: number, center: Location) => {
    const response = await fetch(`${MAP_API_URL}/devices?radius=${radius}&lat=${center.lat}&lng=${center.lng}`);
    if (!response.ok) {
        throw new Error('Failed to fetch device locations');
    }
    return response.json();
};

export const useMapService = (initialRadius: number, initialCenter: Location) => {
    const [deviceLocations, setDeviceLocations] = useState([]);
    const [radius, setRadius] = useState(initialRadius);
    const [center, setCenter] = useState(initialCenter);

    useEffect(() => {
        const loadDeviceLocations = async () => {
            try {
                const locations = await fetchDeviceLocations(radius, center);
                setDeviceLocations(locations);
            } catch (error) {
                console.error(error);
            }
        };

        loadDeviceLocations();
    }, [radius, center]);

    const updateRadius = (newRadius: number) => {
        setRadius(newRadius);
    };

    const updateCenter = (newCenter: Location) => {
        setCenter(newCenter);
    };

    return {
        deviceLocations,
        radius,
        center,
        updateRadius,
        updateCenter,
    };
};