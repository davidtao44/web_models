import { createContext, useState, useContext, useEffect } from 'react';
import { authService, userService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await userService.getCurrentUser();
          setCurrentUser(response.data);
        } catch (err) {
          console.error('Error fetching user data:', err);
          // If token is invalid, clear it
          authService.logout();
        }
      }
      
      setLoading(false);
    };
    
    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { access_token } = response.data;
      
      localStorage.setItem('token', access_token);
      
      // Fetch user data
      const userResponse = await userService.getCurrentUser();
      const userData = userResponse.data;
      
      // Set the current user in state
      setCurrentUser(userData);
      
      return userData;
    } catch (error) {
      // Error handling
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      localStorage.setItem('token', response.data.access_token);
      
      // Fetch user data
      const userResponse = await userService.getCurrentUser();
      setCurrentUser(userResponse.data);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Error en el registro');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};