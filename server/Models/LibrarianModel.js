const mongoose = require('mongoose');

const LibrarianSchema = new mongoose.Schema({
    LibrarianID: {
        type: String,
        required: [true, "Librarian ID is required"],
        unique: true
    },
    Name: {
        type: String,
        required: [true, "Librarian Name is required"]
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

module.exports= mongoose.model("Librarian", LibrarianSchema);