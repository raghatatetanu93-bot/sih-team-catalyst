import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the real JWT in the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (role) {
      config.headers['X-User-Role'] = role;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
