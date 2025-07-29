import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Roots from "./Roots";
import Home from "./Component/Home/Home";
import About from "./Component/About";
import Product from "./Component/Product";
import Contact from "./Component/Contact";
import Login from "./Component/Auth/Login";
import Dashboard from "./Component/Dashboard";
import AuthLayout from "./Authlayout";
import Chatbot from "./Component/Chatbot"; // Import the Chatbot component

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Roots />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Product />} />
        <Route path="contact" element={<Contact />} />
        <Route path="chatbot" element={<Chatbot />} /> {/* Add Chatbot route */}
        {/* <Route path='login' element={<Login/>} /> */}
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="Login" element={<Login />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
