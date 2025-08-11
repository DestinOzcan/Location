import { useState, useEffect } from 'react';

export const useMap = () => {
    const [map, setMap] = useState<any>(null);
    // Kingston, Ontario, Canada coordinates
    const [center, setCenter] = useState({ lat: 44.2312, lng: -76.4860 });
    const [radius, setRadius] = useState(1000);

    const updateRadius = (newRadius: number) => {
        setRadius(newRadius);
    };

    const updateCenter = (newCenter: { lat: number; lng: number }) => {
        setCenter(newCenter);
        if (map) {
            map.setCenter(newCenter);
        }
    };

    return { 
        map, 
        center, 
        radius, 
        setRadius,
        updateRadius, 
        updateCenter 
    };
};

export default useMap;