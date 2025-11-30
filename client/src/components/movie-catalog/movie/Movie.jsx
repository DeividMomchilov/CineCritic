export default function Movie({
  title = "Interstellar",
  rating = "PG-13",
  genre = "Adventure",
  imageUrl = "https://i.ibb.co/FDGqCmM/papers-co-ag74-interstellar-wide-space-film-movie-art-33-iphone6-wallpaper.jpg",
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-xl border border-red-900 bg-zinc-800 group w-[240px] md:w-[270px] min-w-[220px] aspect-[3/4] flex flex-col justify-end mx-[8px] my-2 hover:scale-105 transition duration-200"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition z-0" />
      <div className="relative z-10 px-3 pb-4 pt-2 flex flex-col items-center w-full">
        <div className="flex flex-wrap gap-1 text-xs text-gray-300 font-medium list-none p-0 m-0 justify-center mb-1">
          <span>{rating}</span>
          <span className="mx-1">|</span>
          <span>{genre}</span>
        </div>
        <div className="text-lg font-bold text-gray-100 text-center line-clamp-2 leading-tight">
          {title}
        </div>
      </div>
    </div>
  );
}