import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: ' https://0d41-45-171-182-144.ngrok-free.app', // Assuming FastAPI runs on port 8000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: (credentials) => {
    // Create FormData object for OAuth2 compatibility
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    
    return api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => api.get('/users/me'), // Added getCurrentUser method
};

// User services
export const userService = {
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/me', userData),
};

// Chat services
export const chatService = {
  getConversations: () => api.get('/conversations'),
  getMessages: (conversationId) => api.get(`/conversations/${conversationId}/messages`),
  sendMessage: (conversationId, message) => api.post(`/conversations/${conversationId}/messages`, { content: message }),
  // New method for chat with AI models
  sendChatMessage: (message, model) => api.post('/chat', { message, model }),
};

export default api;