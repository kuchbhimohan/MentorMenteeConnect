import axios from 'axios';
import { initSocket } from './socket';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, user } = response.data;
    
    // Store the token in localStorage
    localStorage.setItem('token', token);
    
    // Initialize the socket with the token
    initSocket(token);

    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during login');
  }
};

export const signupUser = async (name, username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      username,
      email,
      password,
      role
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during signup');
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
    // Clear any client-side auth tokens or user data here
    localStorage.removeItem('token');
    // Disconnect the socket
    const socket = await import('./socket').then(module => module.getSocket());
    if (socket) {
      socket.disconnect();
    }
  } catch (error) {
    console.error('Logout failed:', error);
    // Even if the server-side logout fails, we should still clear client-side data
    localStorage.removeItem('token');
  }
};

export const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  if (token) {
    // Initialize socket if token exists
    initSocket(token);
    return true;
  }
  return false;
};