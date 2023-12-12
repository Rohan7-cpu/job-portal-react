const express = require('express');
const Emp = require('../models/Emp');

const router = express.Router();

// Endpoint to create a new employee
router.post('/create', async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const newEmp = new Emp({ name, email, number, password });
    const savedEmp = await newEmp.save();
    res.status(201).json(savedEmp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to retrieve all employees
router.get('/all', async (req, res) => {
  try {
    const employees = await Emp.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint for employee login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Emp.findOne({ email });

    if (!employee || employee.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/updatepw', async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Emp.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Update employee's password
    employee.password = password; // Assuming password is received as plain text
    await employee.save();
    
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
