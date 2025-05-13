import axios, { AxiosInstance } from 'axios';

const API = 'http://localhost:8081/api';

const instance: AxiosInstance = axios.create({
    baseURL: API,
    timeout: 30_000,
})

export default instance;