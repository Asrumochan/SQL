import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", form);
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data);
        setErrorText("");
        setShowErrorText(false);
        navigate("/");
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
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />
      <br />
      {showErrorText && <div style={{ color: "red" }}>{errorText}</div>}

      <button type="submit">Login</button>
      <p>Don't have an account?</p>
      <button type="button" onClick={() => navigate("/signup")}>
        Create an account
      </button>
    </form>
  );
};

export default Login;
