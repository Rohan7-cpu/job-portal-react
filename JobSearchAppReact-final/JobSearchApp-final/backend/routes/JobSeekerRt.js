const express = require('express');
const multer = require('multer');
const User = require('../models/JobSeeker');

const router = express.Router();

const storage = multer.memoryStorage(); // For handling file in memory, adjust as needed
const upload = multer({ storage });

// Endpoint to create a new user including file upload
router.post('/create', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, number, password, interPercentage, tenthPercentage, graduationPercentage, state, city, zipCode, interestedFields, skills, hobbies } = req.body;

    // Handle the file if it exists in the form data
    let cvData = '';
    if (req.file) {
      cvData = req.file.buffer.toString('base64'); // Store file content as base64 (example)
    }

    const newUser = new User({ 
      name,
      email,
      number,
      password,
      cv: cvData,
      interPercentage,
      tenthPercentage,
      graduationPercentage,
      state,
      city,
      zipCode,
      interestedFields: interestedFields.split(',').map(field => field.trim()), // Splitting interested fields into an array
      skills: skills.split(',').map(skill => skill.trim()), // Splitting skills into an array
      hobbies: hobbies.split(',').map(hobby => hobby.trim()), // Splitting hobbies into an array
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Express route to fetch user data by email
router.get('/all/:email', async (req, res) => {
  try {
    const email = req.params.email;
    // Query MongoDB to find user by email
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
router.post("/updatepw", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // Update user's password
    user.password = password; // Assuming password is received as plain text
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
