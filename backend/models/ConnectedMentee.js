const mongoose = require('mongoose');

const connectedMenteeSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const connectedMentee = mongoose.model('ConnectedMentee', connectedMenteeSchema);

module.exports = connectedMenteeSchema;