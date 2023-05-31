import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/register-login-styling/index.scss";

const Register = () => {
  const navigate = useNavigate();
  interface Credentials {
    name: string;
    email: string;
    password: string;
  }
  const [credentials, setCredentials] = useState<Credentials>({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("notes");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }
      );
      const data = response.data;
      if (data.status === "ok") {
        // Setting the "token" to be on the local storage so I can check if i can create a connection and interact with the websocket on the server.
        localStorage.setItem("token", data.token);
        navigate("/notes");
      } else if (data.status.code === 11000) {
        alert("Duplicate email!");
      } else {
        alert(data.status.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-page-container">
      <h1>Register Page</h1>
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <div className="inputs-labels-container">
          <div className="input-container">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
