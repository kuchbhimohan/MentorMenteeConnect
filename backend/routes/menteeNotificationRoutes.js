const express = require('express');
const router = express.Router();
const { 
  getMenteeNotifications, 
  markNotificationAsRead 
} = require('../controllers/menteeNotificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware
router.use(authMiddleware.protect);

// Get all active notifications for the mentee
router.get('/', getMenteeNotifications);

// Mark a notification as read
router.put('/:notificationId/read', markNotificationAsRead);

module.exports = router;