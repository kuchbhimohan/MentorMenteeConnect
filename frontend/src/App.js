import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './Routes';
import { checkAuthStatus } from './services/auth';

function App() {
  useEffect(() => {
    // Check authentication status and initialize socket if user is authenticated
    checkAuthStatus();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;