import { useState, useEffect } from 'react';
import { Device } from '../types/device';

const useDevices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDevices = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/devices');
            
            if (!response.ok) {
                throw new Error('Failed to fetch devices');
            }
            
            const data = await response.json();
            setDevices(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching devices:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
        
        // Refresh data every 30 seconds
        const interval = setInterval(fetchDevices, 30000);
        
        return () => clearInterval(interval);
    }, []);

    return { devices, loading, error, refetch: fetchDevices };
};

export default useDevices;