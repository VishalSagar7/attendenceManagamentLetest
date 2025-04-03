import axios from 'axios';
import { api_endpoint } from './constants';

const axiosInstance = axios.create({
    baseURL: api_endpoint, 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
