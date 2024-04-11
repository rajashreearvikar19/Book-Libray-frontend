import React from 'react';
import Book from './Book';

const BookList = ({ books, onDelete, onEdit }) => {
  return (
    <div className="d-flex flex-wrap">
      {books.map(book => (
        <Book key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default BookList;
