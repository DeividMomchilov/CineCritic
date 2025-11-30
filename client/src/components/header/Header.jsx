import React from "react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-red-700 shadow-md py-4 px-8 flex items-center justify-between">
      <div className="text-2xl font-bold text-red-600 font-mono tracking-widest">CINE CRITIC</div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-200 hover:text-red-500 transition">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
