const Author = require("../Models/AuthorModel");

module.exports.Signup = async (req, res, next) => {
  try {
    const {AuthorID, AuthorName, AuthorEmail, AuthorBooks,createdAt } = req.body;
    const author = await User.findOne({ BookID });
    if (existingauthor) {
      return res.status(400).json({ message: "Author already exists" });
    }
    const CreatedAuthor = await Author.create({ AuthorID, AuthorName, AuthorEmail, AuthorBooks,createdAt});
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, CreatedAuthor });
 
  } catch (error) {
    console.error(error);
  }
};