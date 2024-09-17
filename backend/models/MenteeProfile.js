const mongoose = require('mongoose');

const menteeProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  currentLevel: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  interestedSubjects: {
    type: String,
    required: true
  },
  profileCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const MenteeProfile = mongoose.model('MenteeProfile', menteeProfileSchema);

module.exports = MenteeProfile;