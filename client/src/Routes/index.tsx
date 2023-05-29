import { createBrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import Notes from "../components/Notes";
import Login from "../components/Login";

export const router = createBrowserRouter([
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "notes", element: <Notes /> },
]);
