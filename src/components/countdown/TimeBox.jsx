  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl min-w-[80px] sm:min-w-[100px] flex-1 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      
      <div className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-1 tabular-nums group-hover:scale-110 transition-transform duration-300">
        {value.toString().padStart(2, '0')}
      </div>
      
      <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );

  export default TimeBox