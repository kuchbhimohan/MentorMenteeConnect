const Message = require('../models/Message');

const chatController = {
  sendMessage: async (req, res) => {
    try {
      const { sender, receiver, content } = req.body;
      const newMessage = new Message({ sender, receiver, content });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Error sending message' });
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
      res.status(500).json({ error: 'Error fetching messages' });
    }
  }
};

module.exports = chatController;