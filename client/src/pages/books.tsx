import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BookType {
  id: number;
  title: string;
  description: string;
  cover?: string;
}

const Books = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axios("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchBooks();
  }, []);

  async function handleDelete(id: number) {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      <h1>Book shop</h1>
      <ul className="books">
        {books.map((book) => (
          <li key={book.id} className="book">
            {book.cover && (
              <div className="image">
                <img src={book.cover} alt={book.title} />
              </div>
            )}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <Link to={`/update/${book.id}`} className="update">
              Update
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/add" className="add">
        Add book
      </Link>
    </section>
  );
};

export default Books;
