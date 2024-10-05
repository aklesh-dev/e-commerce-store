import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.mode === 'development' ? 'http://localhost:5000/api' : '/api',
  withCredentials: true,  // This is required to send cookies to server  
});

export default axiosInstance;