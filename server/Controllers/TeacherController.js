const Teacher= require('../Models/TeacherModel');

module.exports.createTeacher = async (req, res, next) => {
    try {
        const {TeacherID, Name, Email, TelephoneNum,createdAt } = req.body;
        const teacher = await Teacher.findOne({ TeacherID });
        if (teacher) {
          return res.status(400).json({ message: "Teacher already exists" });
        }
        const CreatedTeacher = await Teacher.create({ TeacherID, Name, Email, TelephoneNum,createdAt });
        res
          .status(201)
          .json({ message: "Created the Teacher log successfully", success: true, CreatedTeacher });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
        deletedTeacher = await Teacher.findOneAndDelete({TeacherID} );
        res
          .status(201)
          .json({ message: "Teacher Record Deleted", success: true, deletedTeacher });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateTeacher = async (req, res) => {
    try {
      const { TeacherID } = req.params;
      const {  Name, Email, TelephoneNum,createdAt } = req.body;
  
      const teacher = await Teacher.findOne({ TeacherID });
  
      if (!teacher) {
        return res.status(400).json({ message: "Teacher not found" });
      }
  
      teacher.Name= Name;
      teacher.Email= Email;
      teacher.TelephoneNum= TelephoneNum;
      teacher.createdAt= createdAt;
  
      await teacher.save();
  
      res.status(200).json({ message: "Teacher updated successfully", success: true, updatedTeacher: teacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };