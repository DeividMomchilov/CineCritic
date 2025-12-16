export default function MovieSkeleton() {
    return (
        <div className="w-[240px] aspect-[3/4] rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse flex flex-col overflow-hidden mx-2 my-2">
            <div className="h-2/3 bg-zinc-800/50"></div>
            <div className="p-4 space-y-3 flex-1">
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                <div className="h-8 bg-zinc-800 rounded w-full mt-auto"></div>
            </div>
        </div>
    )
}