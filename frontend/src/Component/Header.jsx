import React from "react";
import { Link, NavLink } from "react-router-dom";
import { User, Leaf , Sparkles} from "lucide-react";
import Thems from "./Thems";

function Header() {
  return (
    <header className="shadow sticky z-50 top-0 dark:text-white">
      <nav className=" border-green-700 px-4 lg:px-6 py-3 bg-gradient-to-br from-green-600 to-green-600">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
           <Link to="/" className="flex items-center mb-4 group">
                       <div className="relative">
                         <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                       </div>
                       <span className="ml-2 text-3xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                         KrishiLink
                       </span>
                     </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/Login"
               className="text-white text-base lg:text-lg bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <User className="w-6 h-6 text-white" />
            </div>
            <Thems />
          </div>
          
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 text-base lg:text-lg font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-lime-300" : "text-white"
                    } border-b border-green-700 hover:bg-green-700 lg:hover:bg-transparent lg:border-0 hover:text-lime-300 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-lime-300" : "text-white"
                    } border-b border-green-700 hover:bg-green-700 lg:hover:bg-transparent lg:border-0 hover:text-lime-300 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-lime-300" : "text-white"
                    } border-b border-green-700 hover:bg-green-700 lg:hover:bg-transparent lg:border-0 hover:text-lime-300 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-lime-300" : "text-white"
                    } border-b border-green-700 hover:bg-green-700 lg:hover:bg-transparent lg:border-0 hover:text-lime-300 lg:p-0`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-lime-300" : "text-white"
                    } border-b border-green-700 hover:bg-green-700 lg:hover:bg-transparent lg:border-0 hover:text-lime-300 lg:p-0`
                  }
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;