import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
import Movie from "../movie-catalog/movie/Movie";
import { Link } from "react-router";

export default function Profile() {
    const { user } = useContext(UserContext);
    
    // Fetch movies where _ownerId equals the current user's ID
    const { data: myMovies, isLoading } = useRequest(
        user?._id ? `/data/movies?where=_ownerId%3D"${user._id}"` : null, 
        []
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-xl font-bold text-red-100 tracking-widest uppercase animate-pulse">Loading Profile...</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden p-4 md:p-12">
            
            {/* Profile Header Card - Styled like the "What is CineCritic" section */}
            <section className="w-full max-w-4xl mt-8 animate-fadein">
                <div className="rounded-xl bg-zinc-950/90 border border-red-900 shadow-2xl p-8 md:p-12 backdrop-blur-lg flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-red-800 shadow-[0_0_20px_rgba(220,38,38,0.3)] relative z-10 shrink-0">
                        <span className="text-5xl">🎬</span>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                        <h2 className="text-red-500 font-bold uppercase tracking-[0.2em] mb-2 text-sm">Critic Profile</h2>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{user.email}</h1>
                        <div className="px-6 py-2 bg-red-950/50 rounded-full border border-red-900/50">
                            <p className="text-gray-200 font-medium">
                                Contributions: <span className="text-red-400 font-extrabold text-xl ml-1">{myMovies.length}</span> movies
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Contributions Section - Styled like "Recommended Movies" */}
            <section className="w-full max-w-6xl mt-16 animate-fadeinUp">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl font-extrabold text-red-600 mb-2 drop-shadow-lg uppercase tracking-widest text-center">My Contributions</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
                </div>
                
                {myMovies.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
                        {myMovies.map(movie => <Movie key={movie._id} {...movie} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-zinc-950/50 border border-red-900/30 border-dashed">
                        <p className="text-xl text-red-100 mb-6 font-light">You haven't added any movies to the platform yet.</p>
                        <Link 
                            to="/catalog/create" 
                            className="bg-gradient-to-r from-red-700 via-red-500 to-yellow-600 text-black font-bold px-8 py-3 rounded-full shadow-lg border border-red-900 hover:from-yellow-600 hover:to-red-700 hover:scale-105 transition transform duration-200"
                        >
                            Start Your Collection
                        </Link>
                    </div>
                )}
            </section>

            {/* CSS Animations (reused from Home.jsx for consistency) */}
            <style>
                {`
                  .animate-fadein { animation: fadeIn 1s ease-out; }
                  .animate-fadeinUp { animation: fadeInUp 1.3s ease-out; }
                  
                  @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(24px); }
                    100% { opacity: 1; transform: none; }
                  }
                  @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(60px); }
                    100% { opacity: 1; transform: none; }
                  }
                `}
            </style>
        </div>
    );
}