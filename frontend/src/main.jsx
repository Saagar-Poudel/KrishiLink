import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Roots from './Roots'
import Home from './Component/Home/Home'
import WeatherAndPrices from './Component/WeatherAndPrices'
import Marketplace from './Component/Marketplace'
import NewsSection from './Component/NewsSection'
import { LanguageProvider } from './contexts/LanguageContext'
import Contact from './Component/Contact'
import Login from './Component/Auth/Login'
import AuthLayout from './Authlayout'
<<<<<<< HEAD
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
=======
import Market from './Component/Markets/Market'

>>>>>>> 02279326c0924dc090732c124fc8dae4ffcaef37

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
   <Route path='/' element={<Roots/>}>
<Route path='' element={<Home/>} />
<Route path='Markets/market' element={<Market/>} />
<Route path='/news' element={<NewsSection/>} />
<Route path='/weather' element={<WeatherAndPrices/>} />
<Route path='contact' element={<Contact/>} />

   </Route>
      {/* <Route path="/" element={<Roots />}>
        <Route path="" element={<Home />} />
<<<<<<< HEAD
        <Route path="about" element={<About />} />
        <Route path="products" element={<Product />} />
        <Route path="contact" element={<Contact />} />
        <Route path="chatbot" element={<Chatbot />} /> {/* Add Chatbot route */}
        {/* <Route path='login' element={<Login/>} /> */}
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
=======
      </Route> */}
>>>>>>> 02279326c0924dc090732c124fc8dae4ffcaef37

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <LanguageProvider>
    <RouterProvider router={router}/>
    </LanguageProvider>
  </StrictMode>
);
