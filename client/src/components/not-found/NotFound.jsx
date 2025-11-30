import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-hidden">
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-24 bg-red-900 blur-3xl opacity-20 pointer-events-none z-0" />
            <main className="relative z-10 bg-zinc-950/90 ring-2 ring-red-800 shadow-2xl backdrop-blur-xl p-10 md:p-16 rounded-3xl flex flex-col items-center gap-6 max-w-lg">
                <h1 className="text-6xl font-extrabold text-transparent bg-gradient-to-r from-red-700 via-yellow-700 to-red-900 bg-clip-text text-center drop-shadow-lg uppercase tracking-widest">404</h1>
                <p className="text-2xl text-gray-100 font-bold text-center mb-1">Page Not Found</p>
                <p className="text-red-200 text-lg text-center mb-5">Sorry, the page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="bg-gradient-to-r from-red-700 via-yellow-700 to-red-900 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-yellow-600 hover:to-red-700 hover:scale-105 transition border border-red-700">Back to Home</Link>
            </main>
        </div>
    );
}