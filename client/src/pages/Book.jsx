import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import "../styling/Book.css";

const BookPage = () => {

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




    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        BookID: '',
        BookName: '',
        BookAuthor: '',
        BookType: '',
    });
    const [selectedBook, setSelectedBook] = useState(null);
    const [editMode, setEditMode] = useState(false);


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
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewBook((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newBook);
        try {
            await axios.post('/Books/create', newBook);
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
            await axios.delete(`/Books/delete/${BookID}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedBook) return;
        try {
            await axios.put(`/Books/update/${selectedBook.BookID}`, selectedBook);
            setEditMode(false);
            setSelectedBook(null);
            fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedBook((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (book) => {
        setSelectedBook(book);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Book Page</h2>

            <div className="book-details">
                <table>
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Book Author</th>
                            <th>Book Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.BookID}>
                                <td>{book.BookID}</td>
                                <td>{book.BookName}</td>
                                <td>{book.BookAuthor}</td>
                                <td>{book.BookType}</td>
                                <td>
                                    <button onClick={() => handleDelete(book.BookID)}>Delete</button>
                                    <button onClick={() => handleEditClick(book)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedBook && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Book</h3>
                            <form className='book-form'>
                                <input
                                    type="text"
                                    name="BookID"
                                    placeholder="Book ID"
                                    value={selectedBook.BookID}
                                    onChange={(e) => setSelectedBook({ ...selectedBook, BookID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="BookName"
                                    placeholder="Book Name"
                                    value={selectedBook.BookName}
                                    onChange={(e) => setSelectedBook({ ...selectedBook, BookName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="BookAuthor"
                                    placeholder="Book Author"
                                    value={selectedBook.BookAuthor}
                                    onChange={(e) => setSelectedBook({ ...selectedBook, BookAuthor: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="BookType"
                                    placeholder="Book Type"
                                    value={selectedBook.BookType}
                                    onChange={(e) => setSelectedBook({ ...selectedBook, BookType: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Book</h3>
                            <form onSubmit={handleSubmit} className='book-form'>
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
                                    placeholder="Book Type "
                                    value={newBook.BookType}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Book</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};
export default BookPage;
