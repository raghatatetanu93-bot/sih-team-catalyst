import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the role/token in the headers
api.interceptors.request.use(
  (config) => {
    const role = localStorage.getItem('userRole');
    if (role) {
      // Typically you'd use a real JWT, but we're mocking auth using role
      config.headers['Authorization'] = `Bearer mock-token-${role}`;
      config.headers['X-User-Role'] = role;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
