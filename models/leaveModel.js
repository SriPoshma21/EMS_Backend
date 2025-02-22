const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  type: { type: String, required: true },
  subject: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  noOfDays: { type: Number, required: true, min: 1 },
  employeeName: { type: String, required: true, trim: true },
  employeeId: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
