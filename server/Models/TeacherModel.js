const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    TeacherID: {
        type: String,
        required: [true, "Teacher ID is required"],
        unique: true
    },
    Name: {
        type: String,
        required: [true, "Teacher Name is required"]
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

module.exports= mongoose.model("Teacher", TeacherSchema);