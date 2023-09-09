const Student= require('../Models/StudentModel');

module.exports.createStudent = async (req, res, next) => {
    try {
        const {StudentID, Name, Email, TelephoneNum,createdAt } = req.body;
        const student = await Student.findOne({ StudentID });
        if (student) {
          return res.status(400).json({ message: "Student already exists" });
        }
        const CreatedStudent = await Student.create({ StudentID, Name, Email, TelephoneNum,createdAt });
        res
          .status(201)
          .json({ message: "Created the Student log successfully", success: true, CreatedStudent });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewStudent = async (req, res, next) => {
    try {
      const {StudentID} = req.params;
  
      const student = await Student.findOne({ StudentID });
      if (!student) {
        return res.status(400).json({ message: "Student not found" });
      }
      res
        .status(201)
        .json({ message: "Student Found", success: true, student });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteStudent = async (req, res, next) => {
      try {
        const { StudentID} = req.params;
    
        const student = await Student.findOne({ StudentID });
        if (!student) {
          return res.status(400).json({ message: "Student not found" });
        }
        deletedStudent = await Student.findOneAndDelete({StudentID} );
        res
          .status(201)
          .json({ message: "Student Record Deleted", success: true, deletedStudent });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateStudent = async (req, res) => {
    try {
      const { StudentID } = req.params;
      const {  Name, Email, TelephoneNum,createdAt } = req.body;
  
      const student = await Student.findOne({ StudentID });
  
      if (!student) {
        return res.status(400).json({ message: "Student not found" });
      }
  
      student.Name= Name;
      student.Email= Email;
      student.TelephoneNum= TelephoneNum;
      student.createdAt= createdAt;
  
      await student.save();
  
      res.status(200).json({ message: "Student updated successfully", success: true, updatedStudent: student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };