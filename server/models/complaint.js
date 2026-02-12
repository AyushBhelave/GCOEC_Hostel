const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // Null if anonymous
  type: { type: String, enum: ['Maintenance', 'Food', 'Ragging', 'Other'], required: true },
  description: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);