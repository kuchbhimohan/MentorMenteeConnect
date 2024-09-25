import React, { useRef, useEffect } from 'react';
import '../../styles/Chat.css';

const Chat = ({ recipient, messages, onSendMessage, onDeleteMessage, newMessage, setNewMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {recipient.name}</h2>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message._id} className={`message ${message.sender === recipient.id ? 'received' : 'sent'}`}>
            <p>{message.message}</p>
            <span className="timestamp">{new Date(message.timestamp).toLocaleString()}</span>
            {message.sender !== recipient.id && (
              <button onClick={() => onDeleteMessage(message._id)} className="delete-btn">Delete</button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={onSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;