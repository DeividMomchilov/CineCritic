import React from "react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-red-700 shadow-md py-4 px-8 flex items-center justify-between">
      <div className="text-2xl font-bold text-red-600 font-mono tracking-widest">CINE CRITIC</div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-200 hover:text-red-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" className="text-gray-200 hover:text-red-500 transition">
              Catalog
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-gray-200 hover:text-red-500 transition">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-black bg-gradient-to-r from-red-700 via-red-500 to-yellow-600 font-semibold px-4 py-2 rounded-full shadow-lg transition hover:from-yellow-600 hover:to-red-700 hover:scale-105 border border-red-700">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
