import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signupUser = async (name, username, email, password, role) => {
  const response = await api.post('/auth/signup', { name, username, email, password, role });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const createMentorProfile = async (profileData) => {
  const response = await api.post('/mentor/profile', profileData);
  return response.data;
};

export const getMentorProfile = async () => {
  const response = await api.get('/mentor/profile');
  return response.data;
};

export const updateMentorProfile = async (profileData) => {
  const response = await api.put('/mentor/profile', profileData);
  return response.data;
};

export const createMenteeProfile = async (profileData) => {
  const response = await api.post('/mentee/profile', profileData);
  return response.data;
};

export const getMenteeProfile = async () => {
  const response = await api.get('/mentee/profile');
  return response.data;
};

export const updateMenteeProfile = async (profileData) => {
  const response = await api.put('/mentee/profile', profileData);
  return response.data;
};

export const getMatchingMentors = async () => {
  const response = await api.get('/match/mentors');
  return response.data;
};
// In your api service file (e.g., api.js)
export const sendConnectionRequest = async (teacherId) => {
  const response = await api.post(`/mentor-connections/request/${teacherId}`);
  return response.data;
};
export default api;