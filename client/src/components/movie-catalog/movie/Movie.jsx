import { Link } from "react-router";

export default function Movie({
  _id,
  imageUrl
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-xl border border-red-900 bg-zinc-800 group w-[240px] md:w-[270px] min-w-[220px] aspect-[3/4] flex flex-col justify-end mx-[8px] my-2 hover:scale-105 transition duration-200"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition z-0" />
      <div className="relative z-10 px-3 pb-4 pt-2 flex flex-col items-center w-full">
        <Link to={`/catalog/${_id}/details`}>
          <button className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-lg shadow-lg border border-red-700 hover:border-red-600 hover:scale-105 active:scale-95">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}