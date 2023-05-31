import "../../styles/register-login-styling/index.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  interface Credentials {
    email: string;
    password: string;
  }
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      const data = response.data;
      if (data.status === "ok") {
        localStorage.setItem("token", data.token);
        navigate("/notes");
      } else {
        alert(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-page-container">
      <h1>Login Page</h1>
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <div className="inputs-labels-container">
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
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        New to the app? <a href="/register">Join now</a>
      </p>
    </div>
  );
};

export default Login;
