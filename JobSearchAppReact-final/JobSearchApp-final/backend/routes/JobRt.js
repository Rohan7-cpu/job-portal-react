const express = require('express');
const User = require('../models/Job');

const router = express.Router();

// Endpoint to create a new user
router.post('/create', async (req, res) => {
  try {
    const { companyName, jobTitle, country, state, minExperience, maxExperience, openings, jobType, minSalary, maxSalary, currency, language, skills, jobDescription
    } = req.body;
    const newUser = new User({ companyName, jobTitle, country, state, minExperience, maxExperience, openings, jobType, minSalary, maxSalary, currency, language, skills, jobDescription
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to retrieve all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await User.findByIdAndDelete(jobId); // Using User model for deletion

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
