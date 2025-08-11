import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchDevices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/devices`);
        return response.data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export const fetchDeviceDetails = async (deviceId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/devices/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching device details:', error);
        throw error;
    }
};