export interface Device {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'maintenance';
    coordinates: {
        lat: number;
        lng: number;
    };
    systemStats: {
        cpuUsage: number;
        ramUsage: number;
        temperature: number;
        uptime: number;
        cpuFrequency?: number;
        ramUsed?: number;
        ramTotal?: number;
        lastUpdated?: string;
    };
    geohash: string;
    geohashPrecision?: number;
    deviceType: string;
    model: string;
    location: string;
    lastSeen?: string;
    lastUpdated?: string;
    ipAddress?: string;
    userAgent?: string;
    manufacturer?: string;
    cpuFrequency?: number;
    ramUsed?: number;
    ramTotal?: number;
    specifications?: string[];
    resources?: { name: string; link: string; type?: string; }[];
}

export interface Location {
    lat: number;
    lng: number;
    address?: string;
}

export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}