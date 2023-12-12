const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const JobSeekersRoute = require('./routes/JobSeekerRt');
const EmpRoute = require('./routes/EmpRt')
const JobRoute = require('./routes/JobRt')
const cors = require('cors');

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// Set CORS headers in a separate middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/JobSeeker', JobSeekersRoute);
app.use('/Emp', EmpRoute); 
app.use('/Job', JobRoute);
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
