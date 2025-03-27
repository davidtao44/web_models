// src/components/Chat/MessageList.jsx
import Message from './Message';

const MessageList = ({ messages, loading }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && (
        <div className="message ai-message loading">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;