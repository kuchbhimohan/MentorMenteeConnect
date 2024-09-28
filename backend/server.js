const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const mentorProfileRoutes = require('./routes/mentorProfileRoutes');
const menteeProfileRoutes = require('./routes/menteeProfileRoutes');
const matchRoutes = require('./routes/matchRoutes');
const menteeNotificationRoutes = require('./routes/menteeNotificationRoutes');
const notificationRoutes = require('./routes/mentorNotificationRoutes');
const connectedMentorsRoutes = require('./routes/connectedMentorsRoutes');
const connectedStudentsRoutes = require('./routes/connectedStudentsRoutes');
const chatRoutes = require('./routes/chatRoutes');

const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to match your frontend URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mentor/profile', mentorProfileRoutes);
app.use('/api/mentee/profile', menteeProfileRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/connected-students', connectedStudentsRoutes);
app.use('/api/mentee-notifications', menteeNotificationRoutes);
app.use('/api/connected-mentors', connectedMentorsRoutes);
app.use('/api/chat', chatRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined`);
  });

  socket.on('sendMessage', async ({ sender, receiver, content }) => {
    try {
      const newMessage = new Message({ sender, receiver, content });
      await newMessage.save();
      
      console.log(`Message sent from ${sender} to ${receiver}: ${content}`);
      
      // Emit to both sender and receiver
      io.to(receiver).emit('newMessage', newMessage);
      io.to(sender).emit('messageSent', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('messageError', { error: 'Failed to send message' });
    }
  });

  socket.on('getMessages', async ({ userId, otherUserId }) => {
    try {
      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: otherUserId },
          { sender: otherUserId, receiver: userId }
        ]
      }).sort({ timestamp: 1 });
      
      socket.emit('messageHistory', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('messageError', { error: 'Failed to fetch messages' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});