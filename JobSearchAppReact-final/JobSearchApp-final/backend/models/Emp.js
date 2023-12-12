const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    password: String,
});

const EmpModel = mongoose.model('Emp', EmpSchema);

module.exports = EmpModel;
