import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import "../styling/Teacher.css";

const TeacherPage = () => {

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




    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({
        TeacherID: '',
        Name: '',
        Email: '',
        TelephoneNum: '',
    });
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/Teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewTeacher((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newTeacher);
        try {
            await axios.post('/Teachers/create', newTeacher);
            setNewTeacher({
                TeacherID: '',
                Name: '',
                Email: '',
                TelephoneNum: '',
            });
            fetchTeachers();
        } catch (error) {
            console.error('Error creating teacher:', error);
        }
    };

    const handleDelete = async (TeacherID) => {
        try {
            await axios.delete(`/Teachers/delete/${TeacherID}`);
            fetchTeachers();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedTeacher) return;
        try {
            await axios.put(`/Teachers/update/${selectedTeacher.TeacherID}`, selectedTeacher);
            setEditMode(false);
            setSelectedTeacher(null);
            fetchTeachers();
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedTeacher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (teacher) => {
        setSelectedTeacher(teacher);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Teacher Page</h2>

            <div className="teacher-details">
                <table>
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Teacher Email</th>
                            <th>Teacher Telephone num</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.TeacherID}>
                                <td>{teacher.TeacherID}</td>
                                <td>{teacher.Name}</td>
                                <td>{teacher.Email}</td>
                                <td>{teacher.TelephoneNum}</td>
                                <td>
                                    <button onClick={() => handleDelete(teacher.TeacherID)}>Delete</button>
                                    <button onClick={() => handleEditClick(teacher)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedTeacher && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Teacher</h3>
                            <form className='teacher-form'>
                                <input
                                    type="text"
                                    name="TeacherID"
                                    placeholder="Teacher ID"
                                    value={selectedTeacher.TeacherID}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, TeacherID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Teacher Name"
                                    value={selectedTeacher.Name}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, Name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Teacher Email"
                                    value={selectedTeacher.Email}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, Email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Teacher Telephone Num"
                                    value={selectedTeacher.TelephoneNum}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, TelephoneNum: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Teacher</h3>
                            <form onSubmit={handleSubmit} className='teacher-form'>
                                <input
                                    type="text"
                                    name="TeacherID"
                                    placeholder="Teacher ID"
                                    value={newTeacher.TeacherID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Teacher Name"
                                    value={newTeacher.Name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Teacher Email"
                                    value={newTeacher.Email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Teacher Telephone Num"
                                    value={newTeacher.TelephoneNum}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Teacher</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};
export default TeacherPage;
