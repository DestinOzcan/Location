export interface Location {
    latitude: number;
    longitude: number;
    radius: number;
}

export interface DeviceLocation {
    deviceId: string;
    location: Location;
}