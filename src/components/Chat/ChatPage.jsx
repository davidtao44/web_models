import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { chatService } from '../../services/api';
import './ChatPage.css';

const ChatPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3.2-3b'); // Updated default model
  const messagesEndRef = useRef(null);
  
  // Add local user state as fallback
  const [localUser, setLocalUser] = useState(null);
  
  // Try to get user from localStorage if currentUser is null
  useEffect(() => {
    if (!currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setLocalUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }
    }
  }, [currentUser]);
  
  // Use either currentUser from context or localUser from localStorage
  const userToDisplay = currentUser || localUser;
  
  const models = [
    { id: 'llama-3.2-3b', name: 'Llama 3.1' },
    { id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B', name: 'DeepSeek R1 14B' },
    // { id: 'qwq:latest', name: 'QWQ' }, usa 19GB de RAM
    { id: 'gemma3:12b', name: 'Gemma 12B' },
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatService.sendChatMessage(input, selectedModel);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => <p key={i}>{line}</p>);
  };

  // Add this useEffect to log the current user for debugging
  useEffect(() => {
    console.log("Current user from context:", currentUser);
    console.log("Local user from storage:", localUser);
    console.log("User to display:", userToDisplay);
  }, [currentUser, localUser, userToDisplay]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <img src="/logos/TECON.PNG" alt="Logo TECON" className="sidebar-logo" />
          <h2>Chat AI</h2>
        </div>
        
        <div className="model-selector">
          <h3>Modelos disponibles</h3>
          <div className="model-list">
            {models.map(model => (
              <button
                key={model.id}
                className={`model-button ${selectedModel === model.id ? 'active' : ''}`}
                onClick={() => setSelectedModel(model.id)}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="user-info">
          <div className="user-details">
            <span className="user-name">{userToDisplay?.name || 'Usuario'}</span>
            <span className="user-email">{userToDisplay?.email || 'correo@ejemplo.com'}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      
      <div className="chat-main">
        <div className="chat-header">
          <h1>Conversación con {models.find(m => m.id === selectedModel)?.name}</h1>
        </div>
        
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <h2>¡Bienvenido al Chat AI!</h2>
              <p> Comienza una conversación con el modelo seleccionado. </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'} ${msg.isError ? 'error-message' : ''}`}
              >
                <div className="message-header">
                  <span className="message-role">
                    {msg.role === 'user' ? 'Tú' : models.find(m => m.id === selectedModel)?.name}
                  </span>
                  <span className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message assistant-message loading-message">
              <div className="message-header">
                <span className="message-role">
                  {models.find(m => m.id === selectedModel)?.name}
                </span>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={isLoading}
            className="chat-input"
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;