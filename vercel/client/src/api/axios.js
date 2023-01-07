import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_SERVER
});

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});