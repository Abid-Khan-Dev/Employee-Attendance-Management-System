const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location',
    required: true,
  },
  date: {
    type: Date,
    
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  statusAtt: {
    type: String,
    enum: ['Present', 'Absent', 'On Leave'],
    default: 'Present',
    
  },
  message: {
    type: String, 
    default: '',
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
 
});



module.exports = mongoose.model('Attendance', attendanceSchema);
