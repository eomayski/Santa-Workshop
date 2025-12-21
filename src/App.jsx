import React, { useState, useEffect } from 'react';
import { Gift, Package, Users, Bell, ChevronLeft, ChevronRight, Snowflake, AlertCircle, Clock } from 'lucide-react';

const SantaWorkshopHero = () => {
//   // --- Carousel Logic ---
//   const notices = [
//     {
//       id: 1,
//       type: 'urgent',
//       icon: <AlertCircle className="text-red-500" />,
//       title: 'Reindeer Drill',
//       message: 'Flight practice at 14:00. Rudolf is leading the formation.',
//     },
//     {
//       id: 2,
//       type: 'info',
//       icon: <Snowflake className="text-blue-500" />,
//       title: 'Weather Alert',
//       message: 'Heavy snow expected in Sector 7. Production speed increased.',
//     },
//     {
//       id: 3,
//       type: 'reminder',
//       icon: <Clock className="text-amber-500" />,
//       title: 'Break Time',
//       message: 'Hot cocoa will be served in the main hall in 30 minutes.',
//     },
//   ];

//   const [currentNotice, setCurrentNotice] = useState(0);

//   // Auto-rotate carousel
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentNotice((prev) => (prev + 1) % notices.length);
//     }, 5000); // Change every 5 seconds
//     return () => clearInterval(timer);
//   }, [notices.length]);

//   const nextNotice = () => setCurrentNotice((prev) => (prev + 1) % notices.length);
//   const prevNotice = () => setCurrentNotice((prev) => (prev === 0 ? notices.length - 1 : prev - 1));

  return (
    // Main Container with Background
    <div className="relative min-h-screen w-full bg-slate-900 overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url(/images/background.png)] bg-cover bg-center"
      ></div>
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-slate-900/40"></div>

      {/* Main Glass Panel */}
      <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/30 rounded-[40px] shadow-2xl overflow-hidden p-8 sm:p-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm animate-pulse">
          <span className="text-xl">❄️</span>
          <span className="text-white font-medium text-sm sm:text-base tracking-wide">
            North Pole Status: <span className="text-green-300 font-bold">OPERATIONAL</span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
          Santa's <span className="text-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Workshop</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-lg sm:text-xl text-slate-100 mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md opacity-90">
          Managing holiday magic with precision and elf-power. 
          All global deliveries are on schedule for Christmas Eve!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card: Total Toys */}
          <div className="group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 flex flex-col items-center shadow-lg hover:bg-white/25 transition-all duration-300">
            <div className="p-3 bg-blue-500/90 text-white rounded-2xl mb-3 shadow-inner">
              <Gift size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Toys Made</h3>
            <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">1,284,902</p>
          </div>

          {/* Card: Pending Orders */}
          <div className="group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 flex flex-col items-center shadow-lg hover:bg-white/25 transition-all duration-300">
            <div className="p-3 bg-orange-500/90 text-white rounded-2xl mb-3 shadow-inner">
              <Package size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">Pending Orders</h3>
            <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">42,105</p>
          </div>

          {/* Card: Active Elves */}
          <div className="group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 flex flex-col items-center shadow-lg hover:bg-white/25 transition-all duration-300">
            <div className="p-3 bg-green-500/90 text-white rounded-2xl mb-3 shadow-inner">
              <Users size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-green-100 text-xs font-bold uppercase tracking-widest mb-1">Active Elves</h3>
            <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">12,400</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SantaWorkshopHero;