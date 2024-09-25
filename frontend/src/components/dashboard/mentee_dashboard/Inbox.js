import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Chat from '../../common/Chat';
import { getConnectedMentors, getConversation, sendMessage, deleteMessage } from '../../../services/api';
import { getSocket } from '../../../services/socket';
import '../../../styles/Inbox.css';

const MenteeInbox = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = getSocket();

  useEffect(() => {
    fetchMentors();
    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (selectedMentor) {
      fetchConversation(selectedMentor.id);
    }
  }, [selectedMentor]);

  const fetchMentors = async () => {
    try {
      const response = await getConnectedMentors();
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const fetchConversation = async (mentorId) => {
    try {
      const response = await getConversation(mentorId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const handleNewMessage = (message) => {
    if (message.sender === selectedMentor?.id || message.receiver === selectedMentor?.id) {
      setMessages(prevMessages => [...prevMessages, message]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedMentor) return;

    try {
      const response = await sendMessage(selectedMentor.id, newMessage);
      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage('');
      socket.emit('sendMessage', { receiverId: selectedMentor.id, message: newMessage });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="inbox-container">
      <div className="chat-list">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search mentors" />
        </div>
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className={`chat-item ${selectedMentor?.id === mentor.id ? 'active' : ''}`}
            onClick={() => setSelectedMentor(mentor)}
          >
            <div className="chat-item-avatar">{mentor.name[0]}</div>
            <div className="chat-item-info">
              <h3>{mentor.name}</h3>
              <p>{mentor.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-area">
        {selectedMentor ? (
          <Chat
            recipient={selectedMentor}
            messages={messages}
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        ) : (
          <div className="no-chat-selected">
            <p>Select a mentor to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteeInbox;