import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", form);
      if (response.data.success) {
        setErrorText("");
        setShowErrorText(false);
        navigate("/login");
      } else {
        setShowErrorText(true);
        setErrorText(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <br />
      <br />
      {showErrorText && <div style={{ color: "red" }}>{errorText}</div>}

      <button type="submit">Sign Up</button>

      <p>Already have an account?</p>
      <button type="button" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </form>
  );
};

export default Signup;
