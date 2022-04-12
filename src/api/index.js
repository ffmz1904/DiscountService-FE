import axios from "axios";

const localHost = 'http://localhost:4000';

const $host = axios.create({
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: localHost
});

const $authHost = axios.create({
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: localHost
});

$authHost.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export {
    $host,
    $authHost
}