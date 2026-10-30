import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<
    {
      cover?: string;
      title?: string;
      description?: string;
      id?: number;
      price?: number;
    }[]
  >([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleAdd = () => {
    navigate("/add");
  };

  const handleDelete = async (id?: number) => {
    try {
      await axios.delete(`http://localhost:3000/books` + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id?: number) => {
    navigate("/update", { state: { id } });
  };

  return (
    <>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>{book.price}</span>
            <button className="update" onClick={() => handleUpdate(book.id)}>
              Update
            </button>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="add" onClick={handleAdd}>
        Add New Book
      </button>
    </>
  );
};

export default Books;
