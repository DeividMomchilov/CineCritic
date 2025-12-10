import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate, useParams } from "react-router";
import useRequest from "../../hooks/useRequest";
import MovieComments from "./movie-comments/MovieComments";

export default function MovieDetails() {
    const {user, isAuthenticated} = useContext(UserContext);
    const {movieId} = useParams();
    const {data : movie, request} = useRequest(`/data/movies/${movieId}`,{});
    const navigate = useNavigate();

    const isOwner = user?._id === movie?._ownerId;

    const deleteGameHandler = async () => {

        try{
            await request(`/data/movies/${movieId}`, 'DELETE');
            navigate('/catalog')
        }catch(error){
            alert(error.message);
        }
        
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-zinc-950/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-red-900 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative h-[400px] md:h-[600px] overflow-hidden">
                            <img 
                                src={movie.imageUrl} 
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            {/* Genre Badge */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                <span className="inline-block px-4 py-2 bg-red-900/50 border border-red-600 rounded-full text-red-300 text-sm font-semibold uppercase tracking-wider">
                                    {movie.genre}
                                </span>
                                <span className="inline-block px-4 py-2 bg-amber-900/50 border border-amber-500 rounded-full text-amber-200 text-sm font-semibold uppercase tracking-wider">
                                    Rating: {movie.rating}
                                </span>
                                <span className="inline-block px-4 py-2 bg-sky-900/50 border border-sky-500 rounded-full text-sky-200 text-sm font-semibold uppercase tracking-wider">
                                    Duration: {movie.duration}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
                                {movie.title}
                            </h1>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-red-400 mb-3 uppercase tracking-wide">
                                    Synopsis
                                </h2>
                                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                                    {movie.description}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            {isOwner &&                       
                            <div className="flex gap-4 mt-6">
                                <Link to={`/catalog/${movieId}/edit`}>
                                    <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-red-600/50">
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={deleteGameHandler} className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-zinc-700/50">
                                    Delete
                                </button>
                            </div>
                            }

                            {isAuthenticated &&
                                <MovieComments/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}