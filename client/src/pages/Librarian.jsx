import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LibrarianPage = () => {
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

    // const handleUpdateChange = (e) => {
    //     const { name, value } = e.target;
    //     setSelectedLibrarian((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleEditClick = (librarian) => {
        setSelectedLibrarian(librarian);
        setEditMode(true);
    };



    return (
        <div>
            <h2>Librarian Page</h2>

            <ul>
                {librarians.map((librarian) => (
                    <li key={librarian.LibrarianID}>
                        {librarian.Name} ({librarian.LibrarianID})
                        <button onClick={() => handleDelete(librarian.LibrarianID)}>Delete</button>
                        <button onClick={() => handleEditClick(librarian)}>Edit</button>
                    </li>
                ))}
            </ul>

            {editMode && selectedLibrarian && (
                <div>
                    <h3>Edit Librarian</h3>
                    <form>
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
                            placeholder="Name"
                            value={selectedLibrarian.Name}
                            onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, Name: e.target.value })}
                        />
                        <input
                            type="text"
                            name="Email"
                            placeholder="Email"
                            value={selectedLibrarian.Email}
                            onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, Email: e.target.value })}
                        />
                        <input
                            type="text"
                            name="TelephoneNum"
                            placeholder="Telephone Number"
                            value={selectedLibrarian.TelephoneNum}
                            onChange={(e) => setSelectedLibrarian({ ...selectedLibrarian, TelephoneNum: e.target.value })}
                        />
                        <button type="button" onClick={handleUpdate}>Update</button>
                    </form>
                </div>
            )}

            <h3>Add New Librarian</h3>
            <form onSubmit={handleSubmit}>
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
                    placeholder="Name"
                    value={newLibrarian.Name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Email"
                    placeholder="Email"
                    value={newLibrarian.Email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="TelephoneNum"
                    placeholder="Telephone Number"
                    value={newLibrarian.TelephoneNum}
                    onChange={handleChange}
                />
                <button type="submit">Add Librarian</button>
            </form>

            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default LibrarianPage;
