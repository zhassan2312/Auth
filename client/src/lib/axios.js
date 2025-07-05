import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
    timeout: 10000, // 10 seconds timeout for all requests
});

// Add response interceptor to handle timeout errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            error.message = 'Request timeout';
        }
        return Promise.reject(error);
    }
);