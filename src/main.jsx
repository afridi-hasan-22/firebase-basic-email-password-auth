import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { SimpleRegistrationForm } from "./components/SimpleRegistrationForm.jsx";
import RegisterTail from "./components/RegisterTail.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/register-mui",
        element: <SimpleRegistrationForm></SimpleRegistrationForm>,
      },
      {
        path : '/register-tail',
        element : <RegisterTail></RegisterTail>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer></ToastContainer>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
