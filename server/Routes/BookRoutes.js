const {createBook, viewBook, deleteBook, updateBook, getAllBooks } = require('../Controllers/BookController');

const router = require("express").Router();

router.post("/create", createBook);
router.get("/:BookID", viewBook);
router.get("/", getAllBooks);
router.delete("/delete/:BookID", deleteBook);
router.put("/update/:BookID", updateBook);


module.exports = router;