import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

function Books() {
  const [booksArray, setBooksArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBooksArray(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteBook = async (bookId) => {
    console.log(`/books/${bookId}`);
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      console.log('Kitap başarıyla silindi.');
      window.location.reload();
    } catch (error) {
      console.error('Kitap silinirken hata oluştu:', error);
    }
  };

  return (
    <div className='books'>
      {booksArray.map((book) => (
        <div key={book.idbooks} className='book-item'>
          <img src={book.cover} alt={book.title} className='book-image' />
          <div className='book-details'>
            <h2 className='book-title'>{book.title}</h2>
            <p className='book-description'>{book.description}</p>
            <p className='book-price'>${book.price}</p>
            <div className='button-container'>
              <Link to={`/update/${book.idbooks}`} className='update-button'>
                Update the Book
              </Link>
              <button
                className='add-button'
                onClick={() => deleteBook(book.idbooks)}
              >
                Delete the Book
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className='add-button'>
        <Link to={`/add`} className='add-button'>
          Add Book
        </Link>
      </button>
    </div>
  );
}

export default Books;
