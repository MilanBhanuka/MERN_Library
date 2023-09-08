const {createLibrarian, viewLibrarian, deleteLibrarian, updateLibrarian, getAllLibrarians } = require('../Controllers/LibrarianController');

const router = require("express").Router();

router.post("/create", createLibrarian);
router.get("/:LibrarianID", viewLibrarian);
router.get("/", getAllLibrarians);
router.delete("/delete/:LibrarianID", deleteLibrarian);
router.put("/update/:LibrarianID", updateLibrarian);


module.exports = router;