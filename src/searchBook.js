// SearchBookByIdForm.js
import React, { useState } from 'react';

const SearchBookByIdForm = ({ onSearch }) => {
  const [bookId, setBookId] = useState('');

  const handleInputChange = (e) => {
    setBookId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(bookId);
    setBookId(''); // Clear the input field after searching
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBookByIdForm;
