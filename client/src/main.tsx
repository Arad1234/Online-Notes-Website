import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <footer className="footer">Online Notes App</footer>
    <main className="main">
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);
