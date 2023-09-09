import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "../styling/Teacher.css";
import Dashboard from './Dashboard';

const TeacherPage = () => {
    const [teachers,setTeachers] = useState([]);
    const [newTeacher,setNewTeacher] = useState({
        TeacherID:'',
        Name:'',
        Email:'',
        Telnum:'',  
    });
const [selectedTeacher,setSelectedTeacher] = useState(null);
const [editMode,setEditMode] = useState(false);

useEffect(()=>{
    fetchTeachers();
},[]);

const fetchTeachers = async () => {
    try{
        const response = await axios.get('/Teachers');
        setTeachers(response.data);
    }catch(error){
        console.error('Error fetching teachers:',error);
    }
};

const handleChange = (e) => {
    // const { name, value } = e.target;
    // console.log(e.target);
    setNewTeacher((prev)=>{
        return{
            ...prev,
            [e.target.name]:e.target.value,
        };
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newTeacher);
    try{
        await axios.post('/Teachers/create',newTeacher);
        setNewTeacher({
            TeacherID:'',
            Name:'',
            Email:'',
            Telnum:'',
        });
        fetchTeachers();
    }catch(error){
        console.error('Error creating teacher:',error);
    }
};

const handleDelete = async (TeacherID) => {
    try{
        await axios.delete(`/Teachers/${TeacherID}`);
        fetchTeachers();
    }catch(error){
        console.error('Error deleting teacher:',error);
    }
};

const handleUpdate = async () => {
    if (!selectedTeacher) return;
    try {
        await axios.put(`/Teachers/${selectedTeacher.TeacherID}`, selectedTeacher);
        setEditMode(false);
        setSelectedTeacher(null);
        fetchTeachers();
    } catch (error) {
        console.error('Error updating Teachr:', error);
    }
};

const handleEditClick= (teacher) => {
    setSelectedTeacher(teacher);
    setEditMode(true);
};

const handleUpdateChange = (e) => {
    setSelectedTeacher((prev)=>{
        return{
            ...prev,
            [e.target.name]:e.target.value,
        };
    });    
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
                        <th>Telephone number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((teacher) => (
                        <tr key={teacher.TeacherID}>
                            <td>{teacher.TeacherID}</td>
                            <td>{teacher.Name}</td>
                            <td>{teacher.Email}</td>
                            <td>{teacher.Telnum}</td>
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
                                onChange={(e) => setSelectedBook({ ...selectedTeacher, TeacherID: e.target.value })}
                            />
                            <input
                                type="text"
                                name="Name"
                                placeholder="teacher Name"
                                value={selectedTeacher.Name}
                                onChange={(e) => setSelectedBook({ ...selectedTeacher, Name: e.target.value })}
                            />
                            <input
                                type="text"
                                name="Email"
                                placeholder="teacher Email"
                                value={selectedTeacher.Email}
                                onChange={(e) => setSelectedBook({ ...selectedTeacher, Email: e.target.value })}
                            />
                            <input
                                type="text"
                                name="Telnum"
                                placeholder="Telephone number "
                                value={selectedTeacher.Telnum}
                                onChange={(e) => setSelectedBook({ ...selectedTeacher, Telnum: e.target.value })}
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
                                value={selectedTeacher.TeacherID}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="Name"
                                placeholder="teacher Name"
                                value={selectedTeacher.Name}
                                onChange={handleChange}
                                //onChange={(e) => setSelectedBook({ ...selectedTeacher, Name: e.target.value })}
                            />
                            <input
                                type="text"
                                name="Email"
                                placeholder="teacher Email"
                                value={selectedTeacher.Email}
                                onChange={handleChange}
                                //onChange={(e) => setSelectedBook({ ...selectedTeacher, Email: e.target.value })}
                            />
                            <input
                                type="text"
                                name="Telnum"
                                placeholder="Telephone number "
                                value={selectedTeacher.Telnum}
                                onChange={handleChange}
                                //onChange={(e) => setSelectedBook({ ...selectedTeacher, Telnum: e.target.value })}
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