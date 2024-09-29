import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';
import { getConnectedStudents, getMessages } from '../../../services/api';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import styles from '../../../styles/mentor_dashboard/Messages.module.css';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const socket = useSocket();
  const [connectedStudents, setConnectedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chatWindows, setChatWindows] = useState({});

  useEffect(() => {
    fetchConnectedStudents();
    if (socket) {
      socket.emit('join', user.id);
      socket.on('newMessage', handleNewMessage);
    }
    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [socket, user.id]);

  const fetchConnectedStudents = async () => {
    try {
      const response = await getConnectedStudents();
      setConnectedStudents(response.students);
    } catch (error) {
      console.error('Error fetching connected students:', error);
    }
  };

  const fetchMessages = async (studentId) => {
    try {
      const fetchedMessages = await getMessages(user.id, studentId);
      setChatWindows(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], messages: fetchedMessages }
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    if (!chatWindows[student._id]) {
      setChatWindows(prev => ({
        ...prev,
        [student._id]: { messages: [], inputValue: '' }
      }));
      fetchMessages(student._id);
    }
  };

  const handleSendMessage = (content) => {
    if (selectedStudent) {
      socket.emit('sendMessage', {
        sender: user.id,
        receiver: selectedStudent._id,
        content
      });
      // Optimistically add the message to the chat window
      const newMessage = {
        sender: user.id,
        receiver: selectedStudent._id,
        content,
        timestamp: new Date().toISOString()
      };
      setChatWindows(prev => ({
        ...prev,
        [selectedStudent._id]: {
          ...prev[selectedStudent._id],
          messages: [...prev[selectedStudent._id].messages, newMessage],
          inputValue: ''
        }
      }));
    }
  };

  const handleNewMessage = (message) => {
    const relevantUserId = message.sender === user.id ? message.receiver : message.sender;
    setChatWindows(prev => ({
      ...prev,
      [relevantUserId]: {
        ...prev[relevantUserId],
        messages: [...(prev[relevantUserId]?.messages || []), message]
      }
    }));
  };

  const handleInputChange = (studentId, value) => {
    setChatWindows(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], inputValue: value }
    }));
  };

  return (
    <div className={styles.messagesContainer}>
      <UserList
        users={connectedStudents}
        selectedUser={selectedStudent}
        onSelectUser={handleSelectStudent}
      />
      {selectedStudent && (
        <ChatWindow
          messages={chatWindows[selectedStudent._id]?.messages || []}
          currentUser={user}
          otherUser={selectedStudent}
          onSendMessage={handleSendMessage}
          inputValue={chatWindows[selectedStudent._id]?.inputValue || ''}
          onInputChange={(value) => handleInputChange(selectedStudent._id, value)}
        />
      )}
    </div>
  );
};

export default Messages;