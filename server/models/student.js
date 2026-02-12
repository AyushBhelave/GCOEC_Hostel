const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  prn: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  isAllotted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);