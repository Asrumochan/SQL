import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });
  const handleChange = (e: any) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3000/book", book);
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
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter the Description"
          name="description"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter the price"
          name="price"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter the cover image"
          name="cover"
          onChange={handleChange}
        />
      </div>
      <button className="formButton" onClick={handleSubmit}>
        Add
      </button>
    </>
  );
};

export default Add;
