import { useState, useCallback } from 'react';
import { Device, MapBounds } from '../types/device';

export const useAreaOfInterest = () => {
    const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null);
    const [devicesInArea, setDevicesInArea] = useState<Device[]>([]);
    const [zoomLevel, setZoomLevel] = useState(12);

    const updateBounds = useCallback((bounds: MapBounds, zoom: number) => {
        setCurrentBounds(bounds);
        setZoomLevel(zoom);
    }, []);

    const filterDevicesInBounds = useCallback((allDevices: Device[], bounds: MapBounds) => {
        const filtered = allDevices.filter(device => {
            const { lat, lng } = device.coordinates;
            return (
                lat >= bounds.south &&
                lat <= bounds.north &&
                lng >= bounds.west &&
                lng <= bounds.east
            );
        });
        setDevicesInArea(filtered);
        return filtered;
    }, []);

    const getAreaInfo = useCallback(() => {
        if (!currentBounds) return null;
        
        const area = {
            center: {
                lat: (currentBounds.north + currentBounds.south) / 2,
                lng: (currentBounds.east + currentBounds.west) / 2
            },
            deviceCount: devicesInArea.length,
            zoomLevel,
            bounds: currentBounds
        };
        
        return area;
    }, [currentBounds, devicesInArea, zoomLevel]);

    return {
        currentBounds,
        devicesInArea,
        zoomLevel,
        updateBounds,
        filterDevicesInBounds,
        getAreaInfo
    };
};

export default useAreaOfInterest;