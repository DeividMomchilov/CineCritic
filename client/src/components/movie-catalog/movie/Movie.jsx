export default function Movie({
  title = "Interstellar",
  description = 'Interstellar is a 2014 Christopher Nolan sci-fi epic about a dystopian future where Earth faces extinction from blight and famine, following ex-pilot Cooper (Matthew McConaughey) and a NASA team through a wormhole near Saturn to find a new habitable planet for humanity, exploring deep themes of love, sacrifice, time dilation, and survival as they navigate gravitational anomalies and black holes, driven by a father\'s bond with his daughter',
  imageUrl = "https://i.ibb.co/FDGqCmM/papers-co-ag74-interstellar-wide-space-film-movie-art-33-iphone6-wallpaper.jpg",
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-xl border border-red-900 bg-zinc-800 group w-[240px] md:w-[270px] min-w-[220px] aspect-[3/4] flex flex-col justify-end mx-[8px] my-2 hover:scale-105 transition duration-200"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition z-0" />
      <div className="relative z-10 px-3 pb-4 pt-2 flex flex-col items-center w-full">  
      </div>
    </div>
  );
}