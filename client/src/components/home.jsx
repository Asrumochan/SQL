import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserAuth = async () => {
      await axios
        .get("http://localhost:3000/")
        .then((resp) => {
          console.log(resp.data )
          if (resp.data.Status === "Success") {
            setAuth(true);
            setName(resp.data.name);
          } else {
            setMessage(resp.data.Error);
            setAuth(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUserAuth();
  }, []);
  return (
    <div>
      {auth ? (
        <>
          <h1>You are logged in! {name}</h1>
        </>
      ) : (
        <>
          <h1>You are not authorized!</h1>
          <h3>{message}</h3>
          <p>Please login to continue.</p>

          <button onClick={() => navigate("/login")}>Go to Login</button>
        </>
      )}
    </div>
  );
};

export default Home;
