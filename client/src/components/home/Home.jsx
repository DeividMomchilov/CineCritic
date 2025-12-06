import React from "react";
import Movie from "../movie-catalog/movie/Movie";
import { data, Link } from "react-router";
import useRequest from "../../hooks/useRequest";


export default function Home() {
  const {data: recommendedMovies} = useRequest(`/data/movies?sortBy=_createdOn%20asc&pageSize=3`,[]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden">     
      <section className="flex flex-col items-center mt-8 animate-fadein">
        <h1 className="text-5xl font-extrabold text-red-600 mb-2 drop-shadow-lg uppercase tracking-widest transition-all animate-fadein">Movie Review Platform</h1>
        <p className="text-lg text-red-100 mb-2 animate-fadeinSlow">Your hub for honest movie reviews.</p>
        <p className="text-md text-gray-200 mb-6 animate-fadeinSlower">Discover, review and discuss movies</p>
        <Link
          to="/catalog"
          className="bg-gradient-to-r from-red-700 via-red-500 to-yellow-600 text-black font-bold px-6 py-3 rounded-full shadow-lg border border-red-900 hover:from-yellow-600 hover:to-red-700 hover:scale-105 transition mb-4 animate-fadeinDelayed"
        >
          Browse Catalog
        </Link>
      </section>
      <section className="mt-10 w-full animate-fadeinUp">
        <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center drop-shadow">Recommended Movies</h2>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-6">
          {recommendedMovies.length === 0 
          ? <p>No movies yet</p>
          : recommendedMovies.map(movie =><Movie key = {movie._id} {...movie}/>)}
        </div>
      </section>
      <section className="mt-10 animate-fadeinUpSlow w-full flex justify-center">
        <div className="rounded-xl bg-zinc-950/90 border border-red-900 shadow-xl p-6 max-w-xl text-center backdrop-blur-lg">
          <h3 className="text-xl font-bold text-red-400 mb-2">What is CineCritic?</h3>
          <p className="text-gray-200 text-base">CineCritic is your modern platform to explore the latest movies, share your opinions, and connect with fellow movie enthusiasts. From blockbuster hits to indie gems, join a community passionate about film.</p>
        </div>
      </section>
      <style>
        {`
          .animate-fadein    { animation: fadeIn 1s; }
          .animate-fadeinSlow { animation: fadeIn 1.8s; }
          .animate-fadeinSlower { animation: fadeIn 2.6s; }
          .animate-fadeinDelayed { animation: fadeIn 2.2s; }
          .animate-fadeinUp { animation: fadeInUp 1.3s; }
          .animate-fadeinUpSlow { animation: fadeInUp 2s; }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: none; }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(60px); }
            80% { opacity: 1; }
            100% { opacity: 1; transform: none; }
          }
        `}
      </style>
    </div>
  );
}