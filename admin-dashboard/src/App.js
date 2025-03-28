import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import DailyScrum from './pages/DailyScrum';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <MainLayout>{children}</MainLayout>;
  };

  // Public Route wrapper (for login)
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            </PublicRoute>
          } 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-scrum"
          element={
            <ProtectedRoute>
              <DailyScrum />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
