const Book = require("../Models/BookModel");

module.exports.createBook = async (req, res, next) => {
  try {
    const {BookID, BookName, BookAuthor, BookType,createdAt } = req.body;
    const book = await Book.findOne({ BookID });
    if (book) {
      return res.status(400).json({ message: "Book already exists" });
    }
    const CreatedBook = await Book.create({ BookID, BookName, BookAuthor, BookType,createdAt });
    res
      .status(201)
      .json({ message: "Created the Book log successfully", success: true, CreatedBook });
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewBook = async (req, res, next) => {
    try {
      const {BookID} = req.params;
  
      const book = await Book.findOne({ BookID });
      if (!book) {
        return res.status(400).json({ message: "Book not found" });
      }
      res
        .status(201)
        .json({ message: "Book Found", success: true, book });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteBook = async (req, res, next) => {
      try {
        const { BookID} = req.params;
    
        const book = await Book.findOne({ BookID });
        if (!book) {
          return res.status(400).json({ message: "Book not found" });
        }
        deletedBook = await Book.findOneAndDelete({BookID} );
        res
          .status(201)
          .json({ message: "Book Record Deleted", success: true, deletedBook });
      } catch (error) {
        console.error(error);
      }
    };

module.exports.updateBook = async (req, res) => {
  try {
    const { BookID } = req.params;
    const { BookName, BookAuthor, BookType, createdAt } = req.body;

    const book = await Book.findOne({ BookID });

    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }

    book.BookName = BookName;
    book.BookAuthor = BookAuthor;
    book.BookType = BookType;
    book.createdAt = createdAt;

    await book.save();

    res.status(200).json({ message: "Book updated successfully", success: true, updatedBook: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
