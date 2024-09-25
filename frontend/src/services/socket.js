import io from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket; // Return existing socket if already initialized

  socket = io('http://localhost:5000', { // Replace with your server URL
    auth: {
      token: token
    }
  });

  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });

  socket.on('connect_error', (err) => {
    console.log('Socket connection error:', err.message);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn('Socket not initialized. Attempting to initialize without token.');
    return initSocket(); // Attempt to initialize without token
  }
  return socket;
};