import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!userRole || !token) {
    // Not logged in or missing token
    return <Navigate to="/login" state={{ from: location, targetRole: allowedRole }} replace />;
  }

  if (userRole !== allowedRole) {
    // Role not authorized for this route
    // Redirect to their respective dashboard
    return <Navigate to={`/${userRole}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
