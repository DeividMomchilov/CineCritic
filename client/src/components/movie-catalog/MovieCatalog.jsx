import useRequest from "../../hooks/useRequest";
import Movie from "./movie/Movie";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router";

export default function MovieCatalog() {
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 10;

    // 1. Upgrade: Fetch only the specific page of movies from the server
    const { data: movies, isLoading } = useRequest(
        `/data/movies?offset=${page * PAGE_SIZE}&pageSize=${PAGE_SIZE}`, 
        []
    );

    const { isAuthenticated } = useContext(UserContext);
    const [search, setSearch] = useState('');
    
    const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))

    const containerClasses = "flex flex-col items-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-x-hidden";

    if (isLoading)
        return (
            <div className={containerClasses + " justify-center"}>
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-white text-xl animate-pulse">Loading Cinema...</div>
            </div>
        )

    if (!isLoading && movies.length === 0) {
        if (page > 0) {
            return (
                <div className={containerClasses + " justify-center"}>
                    <div className="text-white text-2xl mb-6">End of the reel.</div>
                    <button 
                        onClick={() => setPage(old => Math.max(0, old - 1))}
                        className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg"
                    >
                        Rewind (Go Back)
                    </button>
                </div>
            )
        }       
        return (
            <div className={containerClasses + " justify-center"}>
                <div className="text-white text-xl">No movies available yet.</div>
            </div>
        )
    }

    return (
        <div className={containerClasses}>
            <div className="flex justify-center mt-10 mb-6 px-4 w-full">
                <div className="relative w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input 
                        type="text"
                        placeholder="Search current page..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-12 py-3.5 bg-zinc-800/90 border-2 border-red-900/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 focus:bg-zinc-800 transition-all duration-200 shadow-lg backdrop-blur-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <section className="flex flex-wrap justify-center gap-x-6 gap-y-8 w-full px-4 pb-8 max-w-[1920px]">
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-lg font-semibold">Add Movie</span>
                        </div>
                    </Link>
                }
            </section>

            <div className="flex items-center justify-center gap-6 mb-12 mt-auto pt-4">
                <button 
                    onClick={() => setPage(old => Math.max(0, old - 1))}
                    disabled={page === 0}
                    className="px-6 py-2 bg-zinc-900 border border-red-900/30 text-white rounded-full hover:bg-red-900 disabled:opacity-50 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                </button>

                <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
                    Page <span className="text-white font-bold text-lg mx-1">{page + 1}</span>
                </span>

                <button 
                    onClick={() => setPage(old => old + 1)}
                    disabled={movies.length < PAGE_SIZE} 
                    className="px-6 py-2 bg-zinc-900 border border-red-900/30 text-white rounded-full hover:bg-red-900 disabled:opacity-50 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
                >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}