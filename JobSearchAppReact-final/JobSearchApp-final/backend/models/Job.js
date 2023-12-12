const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    companyName: String,
    jobTitle: String,
    country: String,
    state: String,
    minExperience: String,
    maxExperience: String,
    openings: String,
    jobType: String,
    minSalary: String,
    maxSalary: String,
    currency: String,
    language: String,
    skills: String,
    jobDescription: String    
});

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;
