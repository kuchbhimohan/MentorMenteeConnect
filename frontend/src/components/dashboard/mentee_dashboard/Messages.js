import React, { useState, useEffect } from 'react';
import { getConnectedMentors } from '../../../services/api';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import styles from '../../../styles/mentee_dashboard/Messages.module.css';

const Messages = () => {
  const [connectedMentors, setConnectedMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    fetchConnectedMentors();
  }, []);

  const fetchConnectedMentors = async () => {
    try {
      const response = await getConnectedMentors();
      setConnectedMentors(response.mentors);
    } catch (error) {
      console.error('Error fetching connected mentors:', error);
    }
  };

  return (
    <div className={styles.messagesContainer}>
      <UserList
        users={connectedMentors}
        selectedUser={selectedMentor}
        onSelectUser={setSelectedMentor}
      />
      {selectedMentor && (
        <ChatWindow selectedUser={selectedMentor} />
      )}
    </div>
  );
};

export default Messages;