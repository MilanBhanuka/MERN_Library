import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import "../styling/Student.css";

const StudentPage = () => {

                const navigate = useNavigate();
                const [cookies, removeCookie] = useCookies([]);
                useEffect(() => {
                    const verifyCookie = async () => {
                      if (!cookies.token) {
                       navigate("/login");
                      } else {
                        try {
                          const response = await fetch("http://localhost:4000", {
                            method: "POST",
                            credentials: "include",
                          });
                
                          if (!response.ok) {
                            throw new Error("Network response was not ok");
                          }
                
                          const data = await response.json();
                          const { status, user } = data;
                
                          if (!status) {
                            removeCookie("token");
                             navigate("/login");
                          } 
                        } catch (error) {
                          console.error("Error fetching data:", error);
                          removeCookie("token");
                          navigate("/login");
                          
                        }
                      }
                    };
                    verifyCookie();
                }, [cookies, navigate, removeCookie]);


    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        StudentID: '',
        Name: '',
        Email: '',
        TelephoneNum: '',
    });
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editMode, setEditMode] = useState(false);


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
            return {
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
            await axios.delete(`/Students/delete/${StudentID}`);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedStudent) return;
        try {
            await axios.put(`/Students/update/${selectedStudent.StudentID}`, selectedStudent);
            setEditMode(false);
            setSelectedStudent(null);
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Student Page</h2>

            <div className="student-details">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Student Telephone num</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.StudentID}>
                                <td>{student.StudentID}</td>
                                <td>{student.Name}</td>
                                <td>{student.Email}</td>
                                <td>{student.TelephoneNum}</td>
                                <td>
                                    <button onClick={() => handleDelete(student.StudentID)}>Delete</button>
                                    <button onClick={() => handleEditClick(student)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedStudent && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Student</h3>
                            <form className='student-form'>
                                <input
                                    type="text"
                                    name="StudentID"
                                    placeholder="Student ID"
                                    value={selectedStudent.StudentID}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, StudentID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Student Name"
                                    value={selectedStudent.Name}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, Name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Student Email"
                                    value={selectedStudent.Email}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, Email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Student Telephone Num"
                                    value={selectedStudent.TelephoneNum}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, TelephoneNum: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Student</h3>
                            <form onSubmit={handleSubmit} className='student-form'>
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
                                    placeholder="Student Name"
                                    value={newStudent.Name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Student Email"
                                    value={newStudent.Email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Student Telephone Num"
                                    value={newStudent.TelephoneNum}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Student</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};
export default StudentPage;
