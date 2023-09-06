const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  AuthorID: {
    type: String,
    required: [true, "Author ID is required"],
    unique: true,
  },
  AuthorName: {
    type: String,
    required: [true, "Author name is required"],
  },
  AuthorEmail: {
    type: String,
    required: [true, "Author email is required"],
  },
  AuthorBooks: {
    type: String,
    required: [true, "Author's Books are required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Author", AuthorSchema);