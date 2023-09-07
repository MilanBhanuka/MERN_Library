const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    StudentID: {
        type: String,
        required: [true, "Student ID is required"],
        unique: true
    },
    Name: {
        type: String,
        required: [true, "Student Name is required"]
    },
    Email: {
        type: String,
        required: [false]
    },
    TelephoneNum: {
        type: String,
        required: [true, "Telephone number is required"]
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports= mongoose.model("Student", StudentSchema);