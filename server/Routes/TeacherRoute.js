const {createTeacher, viewTeacher, deleteTeacher, updateTeacher, getAllTeachers } = require('../Controllers/TeacherController');

const router = require("express").Router();

router.post("/create", createTeacher);
router.get("/:TeacherID", viewTeacher);
router.get("/", getAllTeachers);
router.delete("/delete/:TeacherID", deleteTeacher);
router.put("/update/:TeacherID", updateTeacher);


module.exports = router;