import React, { useState, useEffect } from 'react';
import { getConnectedStudents } from '../../../services/api';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import styles from '../../../styles/mentor_dashboard/Messages.module.css';

const Messages = () => {
  const [connectedStudents, setConnectedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchConnectedStudents();
  }, []);

  const fetchConnectedStudents = async () => {
    try {
      const response = await getConnectedStudents();
      setConnectedStudents(response.students);
    } catch (error) {
      console.error('Error fetching connected students:', error);
    }
  };

  return (
    <div className={styles.messagesContainer}>
      <UserList
        users={connectedStudents}
        selectedUser={selectedStudent}
        onSelectUser={setSelectedStudent}
      />
      {selectedStudent && (
        <ChatWindow selectedUser={selectedStudent} />
      )}
    </div>
  );
};

export default Messages;