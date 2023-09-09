const mongoose = require("mongoose");

const TeacherSchema= new mongoose.Schema({
  TeacherID: {
    type: String,
    required: [true, "Teacher ID is required"],
    unique: true,
  },
  TeacherName: {
    type: String,
    required: [true, "Teacher name is required"],
  },
  Email: {
    type: String,
    required: [true, "Email is required"],
  },
  Telnum: {
    type: String,
    required: [true, "Telnum is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);