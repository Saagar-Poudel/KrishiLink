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
import AdminLayout from "./AdminLayout"; // New admin layout
import Home from "./Component/Home/Home";
import WeatherAndPrices from "./Component/Weatherandprice/WeatherAndPrices";
import NewsSection from "./Component/NewsSection";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContex";
import Contact from "./Component/Contact";
import AboutUs from "./Component/Aboutus";
import Login from "./Component/Auth/Login";
import AuthLayout from "./Authlayout";
import Market from "./Component/Markets/Market";
import { Toaster } from "react-hot-toast";
import Training from "./Component/Training/Training";
import Storage from "./Component/Storage/Storage";
import { AuthProvider } from "./contexts/Authcontext";
import Dashboard from "./Component/Admin/Homepage";
import SellerProductForm from "./Component/SellerProductForm";
import FarmerProfile from "./Component/Profile/Farmerprofile";
import BuyerProfile from "./Component/Profile/BuyerDashboard";
import RoleBasedProfile from "./Component/Profile/Profile";
import RequiredAuth from "./Component/routes/RequiredAuth";
import AddProduct from "./Component/Profile/Add";
import EditProduct from "./Component/Profile/Edit";
import AccountSettings from "./Component/AccountSetting/AccountSetting";
import Success from "./Component/ESewa/Success";
import Failure from "./Component/ESewa/Failure";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Regular routes with Header/Footer */}
      <Route path="/" element={<Roots />}>
        <Route path="" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/weather" element={<WeatherAndPrices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/training" element={<Training />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/sell" element={<SellerProductForm />} />
        <Route path="/farmerprofile" element={<FarmerProfile />} />
        <Route path="/farmer/:username" element={<FarmerProfile />} /> 
        <Route path="/buyerprofile" element={<BuyerProfile />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/accountsetting" element={<AccountSettings />} />
        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <RoleBasedProfile />
            </RequiredAuth>
          }
        />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />
      </Route>

      {/* Admin routes without Header/Footer */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Dashboard />} />
        {/* Add more admin routes here if needed */}
        {/* <Route path="users" element={<UserManagement />} /> */}
        {/* <Route path="settings" element={<AdminSettings />} /> */}
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);