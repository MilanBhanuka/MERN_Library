import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Author.css";
import Dashboard from './Dashboard';

const AuthorPage = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({
      AuthorID: '',
      AuthorName: '',
      AuthorEmail: '',
      AuthorAuthors: '',
    });
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('/Authors');
            setAuthors(response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewAuthor((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newAuthor);
        try {
            await axios.post('/Authors/create', newAuthor);
            setNewAuthor({
                AuthorID: '',
                AuthorName: '',
                AuthorEmail: '',
                AuthorBooks: '',
            });
            fetchAuthors();
        } catch (error) {
            console.error('Error creating author:', error);
        }
    };

    const handleDelete = async (AuthorID) => {
        try {
            await axios.delete(`/Authors/delete/${AuthorID}`);
            fetchAuthors();
        } catch (error) {
            console.error('Error deleting author:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedAuthor) return;
        try {
            await axios.put(`/Authors/update/${selectedAuthor.AuthorID}`, selectedAuthor);
            setEditMode(false);
            setSelectedAuthor(null);
            fetchAuthors();
        } catch (error) {
            console.error('Error updating author:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedAuthor((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (author) => {
        setSelectedAuthor(author);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Author Page</h2>

            <div className="author-details">
                <table>
                    <thead>
                        <tr>
                            <th>Author ID</th>
                            <th>Author Name</th>
                            <th>Author Email</th>
                            <th>Author Books</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author) => (
                            <tr key={author.AuthorID}>
                                <td>{author.AuthorID}</td>
                                <td>{author.AuthorName}</td>
                                <td>{author.AuthorEmail}</td>
                                <td>{author.AuthorBooks}</td>
                                <td>
                                    <button onClick={() => handleDelete(author.AuthorID)}>Delete</button>
                                    <button onClick={() => handleEditClick(author)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedAuthor && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Author</h3>
                            <form className='author-form'>
                                <input
                                    type="text"
                                    name="AuthorID"
                                    placeholder="Author ID"
                                    value={selectedAuthor.AuthorID}
                                    onChange={(e) => setSelectedAuthor({ ...selectedAuthor, AuthorID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="AuthorName"
                                    placeholder="Author Name"
                                    value={selectedAuthor.AuthorName}
                                    onChange={(e) => setSelectedAuthor({ ...selectedAuthor, AuthorName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="AuthorEmails"
                                    placeholder="Author Emails"
                                    value={selectedAuthor.AuthorEmails}
                                    onChange={(e) => setSelectedAuthor({ ...selectedAuthor, AuthorEmails: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="AuthorBooks"
                                    placeholder="Author Books"
                                    value={selectedAuthor.AuthorBooks}
                                    onChange={(e) => setSelectedAuthor({ ...selectedAuthor, AuthorBooks: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Author</h3>
                            <form onSubmit={handleSubmit} className='author-form'>
                                <input
                                    type="text"
                                    name="AuthorID"
                                    placeholder="Author ID"
                                    value={newAuthor.AuthorID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="AuthorName"
                                    placeholder="Author Name"
                                    value={newAuthor.AuthorName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="AuthorEmail"
                                    placeholder="Author Email"
                                    value={newAuthor.AuthorEmail}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="AuthorBooks"
                                    placeholder="Author Books "
                                    value={newAuthor.AuthorBooks}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Author</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default AuthorPage;