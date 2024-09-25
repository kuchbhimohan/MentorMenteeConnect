import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Chat from '../../common/Chat';
import '../../../styles/Inbox.css';

const MentorInbox = () => {
  const [selectedMentee, setSelectedMentee] = useState(null);
  
  // This would be fetched from the backend in a real application
  const mentees = [
    { id: 1, name: 'John Doe', lastMessage: 'Hello, when is our next session?', unread: 2 },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thank you for the last lesson!', unread: 0 },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Can we reschedule?', unread: 1 },
  ];

  return (
    <div className="inbox-container">
      <div className="chat-list">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search mentees" />
        </div>
        {mentees.map((mentee) => (
          <div
            key={mentee.id}
            className={`chat-item ${selectedMentee?.id === mentee.id ? 'active' : ''}`}
            onClick={() => setSelectedMentee(mentee)}
          >
            <div className="chat-item-avatar">{mentee.name[0]}</div>
            <div className="chat-item-info">
              <h3>{mentee.name}</h3>
              <p>{mentee.lastMessage}</p>
            </div>
            {mentee.unread > 0 && <div className="unread-badge">{mentee.unread}</div>}
          </div>
        ))}
      </div>
      <div className="chat-area">
        {selectedMentee ? (
          <Chat recipient={selectedMentee} senderRole="mentor" />
        ) : (
          <div className="no-chat-selected">
            <p>Select a mentee to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorInbox;