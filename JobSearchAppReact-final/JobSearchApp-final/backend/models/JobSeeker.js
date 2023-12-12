const mongoose = require('mongoose');

const JobSeekerSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  password: String,
  cv: String,
  interPercentage: Number,
  tenthPercentage: Number,
  graduationPercentage: Number,
  state: String,
  city: String,
  zipCode: Number,
  interestedFields: [String],
  skills: [String],
  hobbies: [String],
});

const JobSeekerModel = mongoose.model('JobSeeker', JobSeekerSchema);

module.exports = JobSeekerModel;
