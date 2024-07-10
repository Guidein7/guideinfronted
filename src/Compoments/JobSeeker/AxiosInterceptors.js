// axiosInterceptors.js
import axios from 'axios';
import { logoutUser } from '../JobSeeker/Slices/loginSlice';
import { useNavigate } from 'react-router-dom';

const setupAxiosInterceptors = (store) => {
    const navigate = useNavigate();

    axios.interceptors.request.use(
        config => {
            const state = store.getState();
            const token = state.log.data.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 403) {
                alert('Session expired. Please log in again.');
                store.dispatch(logoutUser());
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;
