const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  leaveType:{
    type: String,
    enum: ['Annual', 'Sick', 'Other'],
    required: true
  },
  leaveStatus: {
    type: String,
    enum: ['Pending','Approved','Rejected'],
    default: 'Pending'
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  message: {
    type: String, 
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});



module.exports = mongoose.model('Leave', leaveSchema);
