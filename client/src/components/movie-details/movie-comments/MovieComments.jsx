import { useContext, useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import { useParams } from "react-router";

export default function MovieComments(){
    const { user,isAuthenticated } = useContext(UserContext); 
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { request } = useRequest(); 
    const { movieId } = useParams();
    
    useEffect(() => {
        const urlParams = new URLSearchParams({
            where: `movieId="${movieId}"`,
            load: 'author=_ownerId:users'
        });
        
        request(`/data/comments?${urlParams.toString()}`)
            .then(result => setComments(result))
            .catch(err => console.error(err));
    }, [movieId, request]);

    const handleCommentSubmit = async () =>{
        try{
            const result = await request(`/data/comments`, 'POST',{
                movieId,
                text: newComment
            });
            setComments((state) => [...state, { ...result, author: user }]);
            setNewComment("");
        }catch(error){
            alert(error.message);
        }
    };

    
    return(
        <section className="mt-12">
            <div className="max-w-4xl mx-auto">
                <div className="bg-zinc-950/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-red-900/50 overflow-hidden">
                    <div className="px-8 py-6 border-b border-red-900/30">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Comments</h3>
                            <span className="px-4 py-1.5 text-sm rounded-full bg-red-900/40 text-red-200 border border-red-700/50 font-medium">
                                {comments.length} {comments.length === 1 ? "comment" : "comments"}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="max-h-96 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {comments.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 text-base">No comments yet. Be the first to share your thoughts!</p>
                                </div>
                            )}

                            {comments.map((comment) => (
                                <article key={comment._id} className="bg-black/30 border border-zinc-800/50 rounded-xl p-5 hover:border-red-800/50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                            {comment.author?.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="text-red-300 font-medium text-sm">
                                                    {comment.author?.email}
                                                </p>
                                            </div>
                                            <p className="text-gray-200 leading-relaxed text-base break-words">{comment.text}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {isAuthenticated && (
                            <form action={handleCommentSubmit} className="space-y-4 pt-4 border-t border-zinc-800/50">
                                <label className="block text-sm font-semibold text-red-300 uppercase tracking-wide">
                                    Add Your Comment
                                </label>
                                <textarea
                                    placeholder="Share your thoughts about this movie..."
                                    className="w-full bg-black/40 text-gray-100 placeholder-gray-500 border border-zinc-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-200 min-h-[120px] resize-none"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!newComment.trim()}
                                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-red-600/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </form>
                        )}

                        {!isAuthenticated && (
                            <div className="text-center py-6 border-t border-zinc-800/50">
                                <p className="text-gray-400 text-base">Please <span className="text-red-400 font-medium">log in</span> to join the discussion.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}