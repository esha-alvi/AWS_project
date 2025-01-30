import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import FileUpload from './Components/FileUpload/FileUpload';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import FileList from './Components/FileList/FileList';
import useTokenValidation from './hooks/useTokenValidation'; // Import the hook

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      {/* Now, the hook is inside Router, so it can safely use useNavigate */}
      <TokenValidationWrapper />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginSignup onLogin={checkAuth} /> : <Navigate to="/upload" />}
        />
        <Route
          path="/upload"
          element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />}
        />
        <Route
          path="/files"
          element={isAuthenticated ? <FileList /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

// This wrapper component ensures that the hook is inside <Router>
const TokenValidationWrapper = () => {
  useTokenValidation();
  return null;
};

export default App;
