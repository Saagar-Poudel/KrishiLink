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
import WeatherAndPrices from "./Component/Weatherandprice/WeatherAndPrices";
import NewsSection from "./Component/NewsSection";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContex";
import Contact from "./Component/Contact";
import AboutUs from "./Component/Aboutus";
import Profile from "./Component/Profile/Profile";
import { ProfileHeader } from "./Component/Profile/Profileheader";
// import ProfilePage from './Component/BuyerDashboard';
import Login from "./Component/Auth/Login";
import AuthLayout from "./Authlayout";
import Market from "./Component/Markets/Market";
import { Toaster } from "react-hot-toast";
import Training from "./Component/Training/Training";
import Storage from "./Component/Storage/Storage";
import { AuthProvider } from "./contexts/Authcontext";
import Dashboard from "./Component/Dashboard/Dashboard";
import SellerProductForm from "./Component/SellerProductForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Roots />}>
        <Route path="" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/weather" element={<WeatherAndPrices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/training" element={<Training />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileheader" element={<ProfileHeader />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sell" element={<SellerProductForm />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <CartProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" />
        </AuthProvider>
      </CartProvider>
    </LanguageProvider>
  </StrictMode>
);