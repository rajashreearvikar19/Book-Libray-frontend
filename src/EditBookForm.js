import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBookForm = ({ book, onUpdate, onCloseForm }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    publication_year: '',
    genre: '',
    description: '',
    cover_image: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Update form data whenever the book prop changes
  useEffect(() => {
    if (book) {
      setFormData({
        id: book.id,
        title: book.title,
        author: book.author,
        publication_year: book.publication_year,
        genre: book.genre ? book.genre.join(', ') : '',
        description: book.description,
        cover_image: book.cover_image
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${formData.id}`, formData);
      setSuccessMessage('Book updated successfully!');
      setShowMessage(true);
      onUpdate(); // Fetch books again to update the list
      setTimeout(() => {
        onCloseForm(); // Hide the form and return to the original page
      }, 3000); // Hide the message after 3 seconds
    } catch (error) {
      console.error('Error updating book:', error);
      setSuccessMessage('Failed to update book. Please try again.');
      setShowMessage(true);
    }
  };

  return (
    <div>
      {showMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID</label>
          <input type="text" className="form-control" name="id" value={formData.id} readOnly />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Publication Year</label>
          <input type="text" className="form-control" name="publication_year" value={formData.publication_year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input type="text" className="form-control" name="genre" value={formData.genre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cover Image URL</label>
          <input type="text" className="form-control" name="cover_image" value={formData.cover_image} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookForm;
