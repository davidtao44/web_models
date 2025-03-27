// src/components/Chat/Message.jsx
import './Message.css';

const Message = ({ message }) => {
  const isAI = message.sender === 'ai';
  const timestamp = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`message ${isAI ? 'ai-message' : 'user-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-timestamp">
        {timestamp}
      </div>
    </div>
  );
};

export default Message;