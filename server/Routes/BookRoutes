const { createBook, viewBook, deleteBook, updateBook } = require("../Controllers/BookController");
const router = require("express").Router();

router.post("/create", createBook);
router.get("/:BookID", viewBook);
router.delete("/delete/:BookID", deleteBook);
router.put("/update/:BookID", updateBook);


module.exports = router;