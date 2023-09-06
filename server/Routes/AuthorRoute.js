const { createAuthor, viewAuthor, deleteAuthor, updateAuthor } = require("../Controllers/AuthorController");
const router = require("express").Router();

router.post("/create", createAuthor);
router.get("/:AuthorID", viewAuthor);
router.delete("/delete/:AuthorID", deleteAuthor);
router.put("/update/:AuthorID", updateAuthor);


module.exports = router;