import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  console.log('Token found, rendering protected content');
  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;