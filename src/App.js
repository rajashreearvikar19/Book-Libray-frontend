// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';
import AddBookForm from './AddBookForm';
import EditBookForm from './EditBookForm';
import SearchBookByIdForm from './searchBook';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [formType, setFormType] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = () => {
    setFormType('add');
    setEditBook(null);
  };

  const handleEditBook = (book) => {
    setFormType('edit');
    setEditBook(book);
  };

  const handleCloseForm = () => {
    setFormType(null);
    setEditBook(null);
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      fetchBooks(); // Refresh the book list after successful deletion
    } catch (error) {
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', error);
    }
  };

  const handleSearchBookById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/books/${id}`);
      setBooks([response.data]);
    } catch (error) {
      setError('Failed to search book. Please try again.');
      console.error('Error searching book:', error);
    }
  };

  return (
    <div className="app-container container border rounded p-4">
      <h1 className="text-center mb-4">Book Library</h1>
      <hr className="mb-4" />
      <SearchBookByIdForm onSearch={handleSearchBookById} />
      {formType === 'add' && <AddBookForm onAdd={fetchBooks} onCloseForm={handleCloseForm} />}
      {formType === 'edit' && <EditBookForm book={editBook} onUpdate={fetchBooks} onCloseForm={handleCloseForm} />}
      {formType === null && (
        <>
          <button className="btn btn-primary mb-2" onClick={handleAddBook}>Add Book</button>
          {error && <div className="alert alert-danger">{error}</div>}
          <BookList books={books} onDelete={handleDeleteBook} onEdit={handleEditBook} />
        </>
      )}
    </div>
  );
}

export default App;
