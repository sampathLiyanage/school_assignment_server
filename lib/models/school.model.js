const mongoose = require('mongoose');

const SchoolSchema = mongoose.Schema({
    name: String,
    address: String,
    noOfStudents: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('School', SchoolSchema);