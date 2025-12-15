import React, { useContext } from "react";
import { Link } from "react-router";
import UserContext from "../../contexts/UserContext";

export default function Header() {
  const { isAuthenticated} = useContext(UserContext);
  return (
    <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-red-700 shadow-md py-2 sm:py-4 px-4 sm:px-8 flex items-center justify-between">
      <div className="text-lg sm:text-2xl font-bold text-red-600 font-mono tracking-widest">
        <Link to="/">
          CINE CRITIC
        </Link>
        </div>
      <nav>
        <ul className="flex space-x-2 sm:space-x-6">
          <li>
            <Link to="/catalog" className="text-sm sm:text-base text-gray-200 hover:text-red-500 transition">
              Catalog
            </Link>
          </li>

          {isAuthenticated 
            ? ( 
            <>
              <li>
                <Link to="/catalog/create" className="text-sm sm:text-base text-gray-200 hover:text-red-500 transition">
                  Add Movie
                </Link>
              </li>
              <li>
                <Link to="/logout" className="text-sm sm:text-base text-gray-200 hover:text-red-500 transition">
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm sm:text-base text-gray-200 hover:text-red-500 transition">
                  My Profile
                </Link>
              </li>
              
            </>
              )
              
            : (
            <>
              <li>
                <Link to="/login" className="text-sm sm:text-base text-gray-200 hover:text-red-500 transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-xs sm:text-base text-black bg-gradient-to-r from-red-700 via-red-500 to-yellow-600 font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg transition hover:from-yellow-600 hover:to-red-700 hover:scale-105 border border-red-700 whitespace-nowrap">
                  Sign Up
                </Link>
              </li>
            </>
              )
          }
        </ul>
      </nav>
    </header>
  );
}
