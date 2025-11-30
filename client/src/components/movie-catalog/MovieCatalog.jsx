import Movie from "./movie/Movie";

export default function MovieCatalog() {
    return (
        <section className="movie-catalog flex flex-wrap gap-6 justify-center items-start m-8 p-8 min-h-[60vh] bg-gradient-to-br from-black via-zinc-900 to-red-900 rounded-3xl shadow-2xl border border-red-900">
            <Movie/>
        </section>
    );
}