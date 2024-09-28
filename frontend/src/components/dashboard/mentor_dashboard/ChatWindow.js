import React from 'react';
import styles from '../../../styles/mentor_dashboard/Messages.module.css';

const ChatWindow = ({ selectedUser }) => {
  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <img src={selectedUser.profilePicture || '/default-avatar.png'} alt={selectedUser.name} className={styles.chatUserAvatar} />
        <span className={styles.chatUserName}>{selectedUser.name}</span>
      </div>
      <div className={styles.chatMessages}>
        {/* Messages will be displayed here */}
      </div>
      <div className={styles.chatInputArea}>
        <input type="text" placeholder="Type a message..." className={styles.chatInput} />
        <button className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;