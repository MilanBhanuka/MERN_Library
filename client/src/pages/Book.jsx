import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    BookID: '',
    BookName: '',
    BookAuthor: '',
    BookType: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/Books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/Books', newBook);
      setNewBook({
        BookID: '',
        BookName: '',
        BookAuthor: '',
        BookType: '',
      });
      fetchBooks();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleDelete = async (BookID) => {
    try {
      await axios.delete(`/Books/${BookID}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Book Page</h2>

      <ul>
        {books.map((book) => (
          <li key={book.BookID}>
            {book.Name} ({book.BookID})
            <button onClick={() => handleDelete(book.BookID)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Book</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="BookID"
          placeholder="Book ID"
          value={newBook.BookID}
          onChange={handleChange}
        />
        <input
          type="text"
          name="BookName"
          placeholder="Book Name"
          value={newBook.BookName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="BookAuthor"
          placeholder="Book Author"
          value={newBook.BookAuthor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="BookType"
          placeholder="Book Type"
          value={newBook.BookType}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>

      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default BookPage;
