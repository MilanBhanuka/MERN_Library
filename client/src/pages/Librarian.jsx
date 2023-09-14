import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import "../styling/Librarian.css";

const LibrarianPage = () => {

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




    const [librarians, setLibrarians] = useState([]);
    const [newLibrarian, setNewLibrarian] = useState({
        LibrarianID: '',
        Name: '',
        Email: '',
        TelephoneNum: '',
    });
    const [selectedLibrarian, setSelectedLibrarian] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchLibrarians();
    }, []);

    const fetchLibrarians = async () => {
        try {
            const response = await axios.get('/Librarians');
            setLibrarians(response.data);
        } catch (error) {
            console.error('Error fetching librarians:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewLibrarian((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newLibrarian);
        try {
            await axios.post('/Librarians/create', newLibrarian);
            setNewLibrarian({
                LibrarianID: '',
                Name: '',
                Email: '',
                TelephoneNum: '',
            });
            fetchLibrarians();
        } catch (error) {
            console.error('Error creating librarian:', error);
        }
    };

    const handleDelete = async (LibrarianID) => {
        try {
            await axios.delete(`/Librarians/delete/${LibrarianID}`);
            fetchLibrarians();
        } catch (error) {
            console.error('Error deleting librarian:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedLibrarian) return;
        try {
            await axios.put(`/Librarians/update/${selectedLibrarian.LibrarianID}`, selectedLibrarian);
            setEditMode(false);
            setSelectedLibrarian(null);
            fetchLibrarians();
        } catch (error) {
            console.error('Error updating librarian:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedLibrarian((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (librarian) => {
        setSelectedLibrarian(librarian);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Librarian Page</h2>

            <div className="librarian-details">
                <table>
                    <thead>
                        <tr>
                            <th>Librarian ID</th>
                            <th>Librarian Name</th>
                            <th>Librarian Email</th>
                            <th>Librarian Telephone num</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {librarians.map((librarian) => (
                            <tr key={librarian.LibrarianID}>
                                <td>{librarian.LibrarianID}</td>
                                <td>{librarian.Name}</td>
                                <td>{librarian.Email}</td>
                                <td>{librarian.TelephoneNum}</td>
                                <td>
                                    <button onClick={() => handleDelete(librarian.LibrarianID)}>Delete</button>
                                    <button onClick={() => handleEditClick(librarian)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedLibrarian && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Librarian</h3>
                            <form className='librarian-form'>
                                <input
                                    type="text"
                                    name="LibrarianID"
                                    placeholder="Librarian ID"
                                    value={selectedLibrarian.LibrarianID}
                                    onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, LibrarianID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Librarian Name"
                                    value={selectedLibrarian.Name}
                                    onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, Name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Librarian Email"
                                    value={selectedLibrarian.Email}
                                    onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, Email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Librarian Telephone Num"
                                    value={selectedLibrarian.TelephoneNum}
                                    onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, TelephoneNum: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Librarian</h3>
                            <form onSubmit={handleSubmit} className='librarian-form'>
                                <input
                                    type="text"
                                    name="LibrarianID"
                                    placeholder="Librarian ID"
                                    value={newLibrarian.LibrarianID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Librarian Name"
                                    value={newLibrarian.Name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Email"
                                    placeholder="Librarian Email"
                                    value={newLibrarian.Email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TelephoneNum"
                                    placeholder="Librarian Telephone Num"
                                    value={newLibrarian.TelephoneNum}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Librarian</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};
export default LibrarianPage;
