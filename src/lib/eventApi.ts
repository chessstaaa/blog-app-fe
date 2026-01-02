import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // URL backend

const eventApi = axios.create({
  baseURL: API_BASE_URL,
});

// Jika butuh auth, tambah interceptor untuk token
eventApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEvents = () => eventApi.get('/event');
export const createEvent = (eventData: any) => eventApi.post('/event', eventData);