const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    StudentID: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    TelephoneNum: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Student", StudentSchema);