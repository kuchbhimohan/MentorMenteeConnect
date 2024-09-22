const MentorNotification = require('../models/MentorNotification');
const ConnectedMentee = require('../models/ConnectedMentee');
const User = require('../models/User'); // Assuming you have a User model

exports.sendConnectionRequest = async (req, res) => {
  try {
    const menteeId = req.user._id;
    const { mentorId } = req.params;

    const mentee = await User.findById(menteeId);
    const mentor = await User.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const existingNotification = await MentorNotification.findOne({
      recipient: mentorId,
      sender: menteeId,
      status: 'pending'
    });

    if (existingNotification) {
      return res.status(400).json({ message: 'A connection request is already pending' });
    }

    const notification = new MentorNotification({
      recipient: mentorId,
      sender: menteeId,
      message: `${mentee.name} wants to connect with you as a mentee.`,
    });

    await notification.save();

    res.status(201).json({ message: 'Connection request sent successfully' });
  } catch (error) {
    console.error('Error sending connection request:', error);
    res.status(500).json({ message: 'Error sending connection request' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const mentorId = req.user._id;

    const notifications = await MentorNotification.find({
      recipient: mentorId,
      activeNotification: true
    }).populate('sender', 'name email');

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

exports.handleConnectionRequest = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const { notificationId } = req.params;
    const { action } = req.body; // 'accept', 'dismiss', or 'delete'

    const notification = await MentorNotification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.recipient.toString() !== mentorId.toString()) {
      return res.status(403).json({ message: 'Not authorized to handle this notification' });
    }

    notification.activeNotification = false;
    notification.status = action;

    if (action === 'accept') {
      let connectedMentees = await ConnectedMentee.findOne({ mentor: mentorId });
      if (!connectedMentees) {
        connectedMentees = new ConnectedMentee({ mentor: mentorId, mentees: [] });
      }
      if (!connectedMentees.mentees.includes(notification.sender)) {
        connectedMentees.mentees.push(notification.sender);
        await connectedMentees.save();
      }
    }

    await notification.save();

    res.status(200).json({ message: `Connection request ${action}ed successfully` });
  } catch (error) {
    console.error('Error handling connection request:', error);
    res.status(500).json({ message: 'Error handling connection request' });
  }
};

exports.getConnectedMentees = async (req, res) => {
  try {
    const mentorId = req.user._id;

    const connectedMentees = await ConnectedMentee.findOne({ mentor: mentorId })
      .populate('mentees', 'name email');

    if (!connectedMentees) {
      return res.status(200).json({ mentees: [] });
    }

    res.status(200).json({ mentees: connectedMentees.mentees });
  } catch (error) {
    console.error('Error fetching connected mentees:', error);
    res.status(500).json({ message: 'Error fetching connected mentees' });
  }
};