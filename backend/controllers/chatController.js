const Message = require('../models/Message');

const chatController = {
  sendMessage: async (req, res) => {
    try {
      const { sender, receiver, content } = req.body;
      const newMessage = new Message({ sender, receiver, content });
      await newMessage.save();
      
      // Emit the new message to both sender and receiver
      req.io.to(sender).to(receiver).emit('newMessage', newMessage);
      
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Error sending message', details: error.message });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { userId, otherUserId } = req.params;
      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: otherUserId },
          { sender: otherUserId, receiver: userId }
        ]
      }).sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages', details: error.message });
    }
  }
};

module.exports = chatController;