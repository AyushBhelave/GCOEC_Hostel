const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gcoec_hostel';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Import Models
const Student = require('./models/student');
const Complaint = require('./models/complaint');

// Routes

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, prn, email, password, branch, year, cgpa, category } = req.body;

    // Validation
    if (!fullName || !prn || !email || !password || !branch || !year || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ prn }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this PRN or Email already exists' });
    }

    // Create new student
    const newStudent = new Student({
      fullName,
      prn,
      email,
      password,
      branch,
      year,
      cgpa: cgpa || 0,
      category,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student', error: error.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { prn, password } = req.body;

    // Validation
    if (!prn || !password) {
      return res.status(400).json({ message: 'PRN and password are required' });
    }

    // Find student
    const student = await Student.findOne({ prn });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check password
    if (student.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', student });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Complaint Route
app.post('/api/complaint', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint logged successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Error logging complaint', error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));