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
    const { name, value } = e.target;
    setNewAuthor({ ...newAuthor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/Authors', newAuthor);
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
      await axios.delete(`/Authors/${AuthorID}`);
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Author Page</h2>

      <ul>
        {authors.map((author) => (
          <li key={author.AuthorID}>
            {author.Name} ({author.AuthorID})
            <button onClick={() => handleDelete(author.AuthorID)}>Delete</button>
          </li>
        ))}
      </ul>

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
          placeholder="AuthorName"
          value={newAuthor.Name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="AuthorEmail"
          placeholder="AuthorEmail"
          value={newAuthor.Email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="AuthorBooks"
          placeholder="AuthorBooks"
          value={newAuthor.AuthorBooks}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Add Author</button>
      </form>

      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default AuthorPage;
