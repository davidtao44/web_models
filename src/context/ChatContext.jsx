// src/context/ChatContext.jsx
import { createContext, useState, useContext } from 'react';
import chatService from '../services/chatService';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const sendPrompt = async (prompt) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Agregar el mensaje del usuario
      const userMessage = {
        id: Date.now(),
        content: prompt,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Enviar prompt al backend
      const response = await chatService.sendPrompt(prompt, user.token);
      
      // Agregar la respuesta del AI
      const aiMessage = {
        id: Date.now() + 1,
        content: response.content,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Error al enviar el prompt. Por favor, intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, loading, error, sendPrompt, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};