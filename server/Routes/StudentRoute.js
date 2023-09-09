const {createStudent, viewStudent, deleteStudent, updateStudent, getAllStudents } = require('../Controllers/StudentController');

const router = require("express").Router();

router.post("/create", createStudent);
router.get("/:StudentID", viewStudent);
router.get("/", getAllStudents);
router.delete("/delete/:StudentID", deleteStudent);
router.put("/update/:StudentID", updateStudent);


module.exports = router;