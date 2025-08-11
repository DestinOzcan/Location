export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};

export const isWithinRadius = (deviceLocation: { lat: number; lon: number }, centerLocation: { lat: number; lon: number }, radius: number): boolean => {
    const distance = calculateDistance(deviceLocation.lat, deviceLocation.lon, centerLocation.lat, centerLocation.lon);
    return distance <= radius;
};