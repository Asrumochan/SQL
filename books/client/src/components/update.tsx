import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: 0,
    cover: "",
  });

  useEffect(() => {
    const fetchBook = async (id: number) => {
      try {
        const response = await axios.get("http://localhost:3000/book" + id);
        setBook(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook(id);
  }, []);
  const handleChange = (e: any) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      axios.put("http://localhost:3000/books" + id, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form">
        <input
          type="text"
          placeholder="Enter the Title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter the Description"
          name="description"
          value={book.description}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter the price"
          name="price"
          value={book.price}
          onChange={handleChange}
        />
        <input
          value={book.cover}
          type="text"
          placeholder="Enter the cover image"
          name="cover"
          onChange={handleChange}
        />
      </div>
      <button className="formButton" onClick={handleSubmit}>
        Update
      </button>
    </>
  );
};

export default Update;
