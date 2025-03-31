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
          // Fetch user data
          const response = await authService.getCurrentUser();
          console.log("User data from API:", response.data);
          setCurrentUser(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      // Store token
      localStorage.setItem('token', response.data.access_token);
      
      // Create a basic user object from the credentials
      const basicUserData = {
        name: credentials.email.split('@')[0], // Use part of email as name
        email: credentials.email
      };
      
      // Store this basic user data
      setCurrentUser(basicUserData);
      localStorage.setItem('user', JSON.stringify(basicUserData));
      
      // Try to get more complete user data from API
      try {
        const userResponse = await authService.getCurrentUser();
        if (userResponse.data && (userResponse.data.name || userResponse.data.email)) {
          // If we got valid user data, update it
          setCurrentUser(userResponse.data);
          localStorage.setItem('user', JSON.stringify(userResponse.data));
        }
      } catch (userError) {
        console.error("Error fetching user data after login:", userError);
        // We'll still use the basic user data we created
      }
      
      return basicUserData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Provide values
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};