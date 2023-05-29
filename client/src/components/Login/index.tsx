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
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
