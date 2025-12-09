import useRequest from "../../hooks/useRequest";
import Movie from "./movie/Movie";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router";


export default function MovieCatalog() {
    const {data: movies, isLoading} = useRequest(`/data/movies`, []);
    const { isAuthenticated } = useContext(UserContext);

    if(isLoading)
        return (
            <section className="movie-catalog flex flex-wrap gap-6 justify-center items-center m-8 p-8 min-h-[60vh] bg-gradient-to-br from-black via-zinc-900 to-red-900 rounded-3xl shadow-2xl border border-red-900">
                <div className="text-white text-xl">Loading movies...</div>
            </section>
        )

    if(!isLoading && movies.length === 0)
        return (
            <section className="movie-catalog flex flex-wrap gap-6 justify-center items-center m-8 p-8 min-h-[60vh] bg-gradient-to-br from-black via-zinc-900 to-red-900 rounded-3xl shadow-2xl border border-red-900">
                <div className="text-white text-xl">No movies available yet.</div>
            </section>
        )

    return (
        <>  

            <section className="movie-catalog flex flex-wrap gap-6 justify-center items-start m-8 p-8 min-h-[60vh] bg-gradient-to-br from-black via-zinc-900 to-red-900 rounded-3xl shadow-2xl border border-red-900">

                { movies.length > 0 &&
                    movies.map(movie => <Movie key = {movie._id} {...movie}/>)
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
        </>
    );
}