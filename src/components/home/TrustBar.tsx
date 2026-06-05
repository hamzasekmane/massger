const avatars = [47, 12, 32, 15].map((i) => `https://i.pravatar.cc/80?img=${i}`);

export function TrustBar() {
  return (
    <div className="mx-auto -mt-4 max-w-6xl px-5 sm:px-8">
      {/* <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-stone-200/80 bg-white px-6 py-5 shadow-lg shadow-stone-200/50 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {avatars.map((a) => (
              <img key={a} src={a} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
            ))}
          </div>
          <span className="text-sm font-600 text-stone-700">Join 10,000+ happy customers</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 sm:inline">Featured On</span>
          <div className="flex items-center gap-6 font-700 text-stone-700">
            <span className="text-sm">TikTok</span>
            <span className="text-sm">Facebook</span>
            <span className="text-sm">Instagram</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
