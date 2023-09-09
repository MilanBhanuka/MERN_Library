const {createAuthor, viewAuthor, deleteAuthor, updateAuthor, getAllAuthors } = require('../Controllers/AuthorController');

const router = require("express").Router();

router.post("/create", createAuthor);
router.get("/:AuthorID", viewAuthor);
router.get("/", getAllAuthors);
router.delete("/delete/:AuthorID", deleteAuthor);
router.put("/update/:AuthorID", updateAuthor);


module.exports = router;