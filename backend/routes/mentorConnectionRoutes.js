const express = require('express');
const router = express.Router();
const mentorConnectionController = require('../controllers/mentorConnectionController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.protect);

// Route for mentee to send a connection request
router.post('/request/:mentorId', mentorConnectionController.sendConnectionRequest);

// Route for mentor to get their notifications
router.get('/notifications', mentorConnectionController.getNotifications);

// Route for mentor to handle a connection request
router.put('/handle-request/:notificationId', mentorConnectionController.handleConnectionRequest);

// Route for mentor to get their connected mentees
router.get('/connected-mentees', mentorConnectionController.getConnectedMentees);

module.exports = router;