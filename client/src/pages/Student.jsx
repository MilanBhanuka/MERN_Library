import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    StudentID: '',
    Name: '',
    Email: '',
    TelephoneNum: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/Students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // console.log(e.target);
    setNewStudent((prev) => {
        return{
            ...prev,
            [e.target.name]: e.target.value,
        };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newStudent);
    try {
      await axios.post('/Students/create', newStudent);
      setNewStudent({
        StudentID: '',
        Name: '',
        Email: '',
        TelephoneNum: '',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleDelete = async (StudentID) => {
    try {
      await axios.delete(`/delete/${StudentID}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Student Page</h2>

      <ul>
        {students.map((student) => (
          <li key={student.StudentID}>
            {student.Name} ({student.StudentID})
            <button onClick={() => handleDelete(student.StudentID)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Student</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="StudentID"
          placeholder="Student ID"
          value={newStudent.StudentID}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={newStudent.Name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Email"
          placeholder="Email"
          value={newStudent.Email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="TelephoneNum"
          placeholder="Telephone Number"
          value={newStudent.TelephoneNum}
          onChange={handleChange}
        />
        <button type="submit">Add Student</button>
      </form>

      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default StudentPage;
