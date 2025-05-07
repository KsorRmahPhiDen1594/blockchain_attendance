// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <div>
      {isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
