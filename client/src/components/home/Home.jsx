import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg uppercase tracking-widest">Movie Review Platform</h1>
      <p className="text-lg text-gray-200">Discover, review and discuss movies</p>
    </div>
  );
}