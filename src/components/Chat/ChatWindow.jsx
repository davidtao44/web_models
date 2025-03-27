// src/components/Chat/ChatWindow.jsx
import { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import MessageList from './MessageList';
import PromptInput from './PromptInput';
import './ChatWindow.css';

const ChatWindow = () => {
  const { user } = useContext(AuthContext);
  const { messages, loading, error, sendPrompt, clearChat } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!user) {
    return <div className="chat-window">Por favor, inicia sesión para usar el chat.</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>AI Chat</h2>
        <button onClick={clearChat} className="clear-chat-btn">
          Limpiar Chat
        </button>
      </div>
      
      <MessageList messages={messages} loading={loading} />
      {error && <div className="error-message">{error}</div>}
      <div ref={messagesEndRef} />
      
      <PromptInput onSend={sendPrompt} loading={loading} />
    </div>
  );
};

export default ChatWindow;