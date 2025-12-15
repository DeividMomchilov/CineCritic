import useRequest from "../../hooks/useRequest";
import Movie from "./movie/Movie";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router";


export default function MovieCatalog() {
    const {data: movies, isLoading} = useRequest(`/data/movies`, []);
    const { isAuthenticated } = useContext(UserContext);
    const [search,setSearch] = useState('');
    const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))

    if(isLoading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden">
                <div className="text-white text-xl">Loading movies...</div>
            </div>
        )

    if(!isLoading && movies.length === 0)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden">
                <div className="text-white text-xl">No movies available yet.</div>
            </div>
        )

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden">
            <div className="flex justify-center mt-10 mb-6 px-4 w-full">
                <div className="relative w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg 
                            className="h-6 w-6 text-red-500" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input 
                        type="text"
                        placeholder="Search for movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-12 py-3.5 bg-zinc-800/90 border-2 border-red-900/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 focus:bg-zinc-800 transition-all duration-200 shadow-lg backdrop-blur-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <svg 
                                className="h-5 w-5" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            {search && (
                <p className="text-center mb-4 text-gray-400 text-sm">
                    Found {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
                </p>
            )}
            <section className="flex flex-wrap justify-center gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-6 w-full px-4 pb-8">

                { (movies.length > 0 && search === '') ?
                    movies.map(movie => <Movie key = {movie._id} {...movie}/>)
                    :
                    filteredMovies.map(movie => <Movie key = {movie._id} {...movie}/>)
                }
                
                {isAuthenticated &&
                    <Link 
                        to={"/catalog/create"}
                        className="relative rounded-xl overflow-hidden shadow-xl border-2 border-dashed border-red-600 bg-zinc-800/50 group w-[240px] md:w-[270px] min-w-[220px] aspect-[3/4] flex flex-col justify-center items-center mx-[8px] my-2 hover:scale-105 hover:border-red-500 hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex flex-col items-center justify-center gap-3 text-red-400 group-hover:text-red-300 transition-colors">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-16 w-16 stroke-current stroke-2" 
                                fill="none" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-lg font-semibold">Add Movie</span>
                        </div>
                    </Link>
                }
            </section>
        </div>
    );
}