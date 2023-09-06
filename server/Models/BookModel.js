const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  BookID: {
    type: String,
    required: [true, "Book ID is required"],
    unique: true,
  },
  BookName: {
    type: String,
    required: [true, "Book name is required"],
  },
  BookAuthor: {
    type: String,
    required: [false],
  },
  BookType: {
    type: String,
    required: [true, "Book Type is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Book", BookSchema);