import React from 'react';

const Book = ({ book, onDelete, onEdit }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">Publication Year: {book.publication_year}</p>
          <p className="card-text">Description: {book.description}</p>
          <div className="mt-auto">
            <button className="btn btn-danger" onClick={() => onDelete(book.id)}>Delete</button>
            <span className="mx-2"></span> {/* Add space between buttons */}
            <button className="btn btn-primary" onClick={() => onEdit(book)}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
