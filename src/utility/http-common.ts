import axios, { AxiosInstance } from 'axios'
import {useAuthStore} from "@/stores/auth.module";

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      await authStore.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;