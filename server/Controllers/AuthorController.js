const Author= require('../Models/AuthorModel');

module.exports.createAuthor = async (req, res, next) => {
    try {
        const {AuthorID, AuthorName, AuthorEmail, AuthorBooks ,createdAt  } = req.body;
        const author = await Author.findOne({ AuthorID });
        if (author) {
          return res.status(400).json({ message: "Author already exists" });
        }
        const CreatedAuthor = await Author.create({ AuthorID, AuthorName, AuthorEmail, AuthorBooks ,createdAt });
        res
          .status(201)
          .json({ message: "Created the Author log successfully", success: true, CreatedAuthor });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewAuthor = async (req, res, next) => {
    try {
      const {AuthorID} = req.params;
  
      const author = await Author.findOne({ AuthorID });
      if (!author) {
        return res.status(400).json({ message: "Author not found" });
      }
      res
        .status(201)
        .json({ message: "Author Found", success: true, author });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteAuthor = async (req, res, next) => {
      try {
        const { AuthorID} = req.params;
    
        const author = await Author.findOne({ AuthorID });
        if (!author) {
          return res.status(400).json({ message: "Author not found" });
        }
        deletedAuthor = await Author.findOneAndDelete({AuthorID} );
        res
          .status(201)
          .json({ message: "Author Record Deleted", success: true, deletedAuthor });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateAuthor = async (req, res) => {
    try {
      const { AuthorID } = req.params;
      const {  AuthorName, AuthorEmail, AuthorBooks ,createdAt } = req.body;
  
      const author = await Author.findOne({ AuthorID });
  
      if (!author) {
        return res.status(400).json({ message: "Author not found" });
      }
      author.AuthorName= AuthorName;
      author.AuthorEmail= AuthorEmail;
      author.AuthorBooks= AuthorBooks;
      author.createdAt= createdAt;
  
      await author.save();
  
      res.status(200).json({ message: "Author updated successfully", success: true, updatedAuthor: author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };