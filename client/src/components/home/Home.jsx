import React, { useContext } from "react";
import Movie from "../movie-catalog/movie/Movie";
import { Link } from "react-router";
import useRequest from "../../hooks/useRequest";
import UserContext from "../../contexts/UserContext";

export default function Home() {
  const { isAuthenticated } = useContext(UserContext);

  // 1. Fetch Hero Movie (Top Rated)
  const { data: heroMovies, isLoading: heroLoading } = useRequest(`/data/movies?sortBy=rating%20desc&pageSize=1`, []);
  const featuredMovie = heroMovies.length > 0 ? heroMovies[0] : null;

  // 2. Fetch Latest Movies (Newest 4)
  const { data: latestMovies, isLoading: latestLoading } = useRequest(`/data/movies?sortBy=_createdOn%20desc&pageSize=4`, []);

  // Skeleton loader for the grid
  const MovieSkeleton = () => (
      <div className="w-full aspect-[2/3] bg-zinc-900 rounded-xl animate-pulse"></div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-black relative overflow-x-hidden">     
      
      {/* ================= HERO SECTION ================= */}
      <section className="w-full relative animate-fadein">
        {!heroLoading && featuredMovie ? (
            <div className="relative w-full h-[85vh] md:h-[95vh]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={featuredMovie.imageUrl} 
                        alt={featuredMovie.title}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-24 flex flex-col justify-end items-start z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded shadow-lg">
                            #1 Top Rated
                        </span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded">
                            {featuredMovie.genre}
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-none max-w-4xl">
                        {featuredMovie.title}
                    </h1>
                    
                    <p className="text-gray-200 text-lg md:text-xl line-clamp-3 max-w-2xl mb-10 font-medium drop-shadow-md border-l-4 border-red-600 pl-6">
                        {featuredMovie.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <Link 
                            to={`/catalog/${featuredMovie._id}/details`} 
                            className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition transform hover:-translate-y-1 shadow-red-900/50 shadow-lg flex items-center gap-3"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                            Check Details
                        </Link>
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-full h-[85vh] bg-zinc-900 animate-pulse"></div>
        )}
      </section>

      <section className="w-full max-w-[1600px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Fresh Arrivals</h2>
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
            </div>
            <Link to="/catalog" className="hidden md:flex items-center text-gray-400 hover:text-white transition group">
                View All Catalog
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestLoading 
                ? [1,2,3,4].map(i => <MovieSkeleton key={i} />)
                : latestMovies.map(movie => <Movie key={movie._id} {...movie} />)
            }
        </div>
        
        <div className="mt-8 md:hidden flex justify-center">
            <Link to="/catalog" className="w-full py-4 rounded-xl border border-zinc-700 text-white text-center font-bold hover:bg-zinc-800 transition">
                Browse Full Catalog
            </Link>
        </div>
      </section>

      <section className="w-full bg-zinc-900/30 border-y border-zinc-800 py-20">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">Browse by Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="relative h-64 group rounded-2xl overflow-hidden cursor-pointer border border-zinc-700 hover:border-red-500 transition-colors">
                    <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-700" alt="Action" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-xl">Action</h3>
                        <span className="mt-2 text-red-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Explore &rarr;</span>
                    </div>
                </div>

                <div className="relative h-64 group rounded-2xl overflow-hidden cursor-pointer border border-zinc-700 hover:border-red-500 transition-colors">
                    <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-700" alt="Drama" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-xl">Drama</h3>
                         <span className="mt-2 text-red-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Explore &rarr;</span>
                    </div>
                </div>

                <div className="relative h-64 group rounded-2xl overflow-hidden cursor-pointer border border-zinc-700 hover:border-red-500 transition-colors">
                    <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition duration-700" alt="Sci-Fi" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-xl">Sci-Fi</h3>
                         <span className="mt-2 text-red-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Explore &rarr;</span>
                    </div>
                </div>

            </div>
          </div>
      </section>

      {/* ================= CALL TO ACTION (CTA) ================= */}
      {/* Only show this big banner if user is NOT logged in */}
      {!isAuthenticated && (
        <section className="w-full max-w-5xl mx-auto px-6 py-24">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-900 to-black border border-red-800 shadow-2xl">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 p-12 md:p-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start Your Journey</h2>
                    <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of movie lovers. Create your collection, write reviews, and discover your next favorite film. It's free and takes 30 seconds.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/register" 
                            className="px-10 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 hover:scale-105 transition shadow-xl"
                        >
                            Create Account
                        </Link>
                        <Link 
                            to="/login" 
                            className="px-10 py-4 bg-black/50 text-white border border-white/20 font-bold text-lg rounded-xl hover:bg-black/70 hover:border-white/50 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* ================= INFO / FOOTER SECTION ================= */}
      <section className="w-full border-t border-zinc-900 bg-zinc-950 py-16">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-red-600 tracking-widest">CINECRITIC</h3>
                <p className="text-zinc-500 mt-2">© 2024 All rights reserved.</p>
            </div>
         </div>
      </section>

      <style>
        {`
          .animate-fadein    { animation: fadeIn 1.5s ease-out; }
          .animate-blob { animation: blob 7s infinite; }
          
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}
      </style>
    </div>
  );
}