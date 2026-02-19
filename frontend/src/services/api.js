import axios from 'axios';
const API_URL = 'http://localhost:8000/api/v1';
export const generateYAML = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/generate/`, data);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Failed to generate YAML');
        }
        throw error;
    }
};
export const downloadYAML = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/generate/download`, data);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Failed to download YAML');
        }
        throw error;
    }
};
