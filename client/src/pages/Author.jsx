import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorPage = () => {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({
      AuthorID: '',
      AuthorName: '',
      AuthorEmail: '',
      AuthorBooks: '',
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

    // const handleUpdateChange = (e) => {
    //     const { name, value } = e.target;
    //     setSelectedAuthor((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleEditClick = (author) => {
        setSelectedAuthor(author);
        setEditMode(true);
    };



    return (
        <div>
            <h2>Author Page</h2>

            <ul>
                {authors.map((author) => (
                    <li key={author.AuthorID}>
                        {author.AuthorName} ({author.AuthorID})
                        <button onClick={() => handleDelete(author.AuthorID)}>Delete</button>
                        <button onClick={() => handleEditClick(author)}>Edit</button>
                    </li>
                ))}
            </ul>

            {editMode && selectedAuthor && (
                <div>
                    <h3>Edit Author</h3>
                    <form>
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
                            name="AuthorEmail"
                            placeholder="Author Email"
                            value={selectedAuthor.AuthorEmail}
                            onChange={(e) => setSelectedAuthor({ ...selectedAuthor, AuthorEmail: e.target.value })}
                        />
                        <input
                            type="text"
                            name="AuthorBooks"
                            placeholder="Author Books"
                            value={selectedAuthor.AuthorBooks}
                            onChange={(e) => setSelectedAuthor({ ...selectedAuthor, AuthorBooks: e.target.value })}
                        />
                        <button type="button" onClick={handleUpdate}>Update</button>
                    </form>
                </div>
            )}

            <h3>Add New Author</h3>
            <form onSubmit={handleSubmit}>
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
                    placeholder="Author Books"
                    value={newAuthor.AuthorBooks}
                    onChange={handleChange}
                />
                <button type="submit">Add Author</button>
            </form>

            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default AuthorPage;
