import axios from 'axios';

// next
import { getSession } from 'next-auth/react';

const axiosServices = axios.create({
    baseURL: process.env.NEXT_APP_API_URL as string
});
// console.log('Axios BaseURL: ', process.env.NEXT_APP_API_URL);

// ==============================|| AXIOS ||============================== //

axiosServices.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.token.accessToken) {
            config.headers['Authorization'] = `Bearer ${session?.token.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401 && !window.location.href.includes('/sign-in')) {
            window.location.pathname = '/sign-in';
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axiosServices;
