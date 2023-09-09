const Teacher = require("../Models/TeacherModel");

module.exports.createTeacher = async (req, res, next) => {
  try {
    const {TeacherID, TeacherName, Email, Telnum,createdAt } = req.body;
    const teacher = await Teacher.findOne({ TeacherID });
    if (teacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }
    const CreatedTeacher = await Teacher.create({ TeacherID, TeacherName, Email, Telnum,createdAt });
    res
      .status(201)
      .json({ message: "Created the Teacher log successfully", success: true, CreatedTeacher });
  } catch (error) {
    console.error(error);
  }
};

module.exports.viewTeacher = async (req, res, next) => {
  try {
    const {TeacherID} = req.params;

    const teacher = await Teacher.findOne({ TeacherID });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found" });
    }
    res
      .status(201)
      .json({ message: "Teacher Found", success: true, teacher });
  } catch (error) {
    console.error(error);
  }
};


module.exports.deleteTeacher = async (req, res, next) => {
    try {
      const { TeacherID} = req.params;
  
      const teacher = await Teacher.findOne({ TeacherID });
      if (!teacher) {
        return res.status(400).json({ message: "Teacher not found" });
      }
      deletedTeacher = await Teacher.findOneAndDelete(TeacherID );
      res
        .status(201)
        .json({ message: "Teache Record Deleted", success: true, deletedTeacher });
    } catch (error) {
      console.error(error);
    }
  };


module.exports.updatedTeacher = async (req, res) => {
  try {
    const { TeacherID } = req.params;
    const { TeacherName, Email, Telnum, createdAt } = req.body;

    const teacher = await Teacher.findOne({ TeacherID });

    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found" });
    }

    teacher.TeacherName = TeacherName;
    teacher.Email = Email;
    teacher.Telnum = Telnum;
    teacher.createdAt = createdAt;

    await teacher.save();

    res.status(200).json({ message: "Teacher updated successfully", success: true, updatedTeacher: teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
