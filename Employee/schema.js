const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    contactNumber: Number,
    designation: String,
    department: String,
    salary: Number,
})

module.exports = mongoose.model('Employee', empSchema);