import * as geohash from 'ngeohash';

export interface GeohashInfo {
    hash: string;
    precision: number;
    approximateAccuracy: string;
    neighbors: string[];
    bbox: {
        minLat: number;
        minLng: number;
        maxLat: number;
        maxLng: number;
    };
}

export const getGeohashInfo = (lat: number, lng: number, precision: number = 9): GeohashInfo => {
    const hash = geohash.encode(lat, lng, precision);
    const bbox = geohash.decode_bbox(hash);
    const neighbors = geohash.neighbors(hash);
    
    // Approximate accuracy based on precision level
    const accuracyMap: { [key: number]: string } = {
        1: '~5,000 km',
        2: '~1,250 km',
        3: '~156 km',
        4: '~39 km',
        5: '~4.9 km',
        6: '~1.2 km',
        7: '~153 m',
        8: '~38 m',
        9: '~4.8 m',
        10: '~1.2 m',
        11: '~15 cm',
        12: '~3.7 cm'
    };

    return {
        hash,
        precision,
        approximateAccuracy: accuracyMap[precision] || `~${Math.pow(5, precision - 1)} units`,
        neighbors: Object.values(neighbors),
        bbox: {
            minLat: bbox[0],
            minLng: bbox[1],
            maxLat: bbox[2],
            maxLng: bbox[3]
        }
    };
};

export const decodeGeohash = (hash: string) => {
    return geohash.decode(hash);
};

export const getGeohashDistance = (hash1: string, hash2: string): number => {
    const coord1 = geohash.decode(hash1);
    const coord2 = geohash.decode(hash2);
    
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in kilometers
    const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
    const dLng = (coord2.longitude - coord1.longitude) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1.latitude * Math.PI / 180) * Math.cos(coord2.latitude * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
};