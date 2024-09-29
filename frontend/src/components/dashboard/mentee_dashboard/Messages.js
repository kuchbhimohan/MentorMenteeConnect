import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';
import { getConnectedMentors, getMessages } from '../../../services/api';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import styles from '../../../styles/mentee_dashboard/Messages.module.css';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const socket = useSocket();
  const [connectedMentors, setConnectedMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [chatWindows, setChatWindows] = useState({});

  useEffect(() => {
    fetchConnectedMentors();
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

  const fetchConnectedMentors = async () => {
    try {
      const response = await getConnectedMentors();
      setConnectedMentors(response.mentors);
    } catch (error) {
      console.error('Error fetching connected mentors:', error);
    }
  };

  const fetchMessages = async (mentorId) => {
    try {
      const fetchedMessages = await getMessages(user.id, mentorId);
      setChatWindows(prev => ({
        ...prev,
        [mentorId]: { ...prev[mentorId], messages: fetchedMessages }
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor);
    if (!chatWindows[mentor._id]) {
      setChatWindows(prev => ({
        ...prev,
        [mentor._id]: { messages: [], inputValue: '' }
      }));
      fetchMessages(mentor._id);
    }
  };

  const handleSendMessage = (content) => {
    if (selectedMentor) {
      socket.emit('sendMessage', {
        sender: user.id,
        receiver: selectedMentor._id,
        content
      });
      // Optimistically add the message to the chat window
      const newMessage = {
        sender: user.id,
        receiver: selectedMentor._id,
        content,
        timestamp: new Date().toISOString()
      };
      setChatWindows(prev => ({
        ...prev,
        [selectedMentor._id]: {
          ...prev[selectedMentor._id],
          messages: [...prev[selectedMentor._id].messages, newMessage],
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

  const handleInputChange = (mentorId, value) => {
    setChatWindows(prev => ({
      ...prev,
      [mentorId]: { ...prev[mentorId], inputValue: value }
    }));
  };

  return (
    <div className={styles.messagesContainer}>
      <UserList
        users={connectedMentors}
        selectedUser={selectedMentor}
        onSelectUser={handleSelectMentor}
      />
      {selectedMentor && (
        <ChatWindow
          messages={chatWindows[selectedMentor._id]?.messages || []}
          currentUser={user}
          otherUser={selectedMentor}
          onSendMessage={handleSendMessage}
          inputValue={chatWindows[selectedMentor._id]?.inputValue || ''}
          onInputChange={(value) => handleInputChange(selectedMentor._id, value)}
        />
      )}
    </div>
  );
};

export default Messages;