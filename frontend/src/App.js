import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './Routes';
// import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <AuthProvider>
      {/* <SocketProvider> */}
        <Router>
          <AppRoutes />
        </Router>
      {/* </SocketProvider> */}
    </AuthProvider>
  );
}

export default App;