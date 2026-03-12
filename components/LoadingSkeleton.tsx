export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 py-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="bg-white/5 animate-pulse rounded-2xl aspect-square border border-white/5 overflow-hidden flex flex-col justify-end p-4 relative">
            <div className="w-1/3 h-3 bg-white/10 rounded mb-3"></div>
            <div className="w-2/3 h-4 bg-white/10 rounded mb-2"></div>
            <div className="w-1/4 h-3 bg-white/10 rounded"></div>
            <div className="absolute top-4 right-4 w-12 h-6 bg-white/10 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
