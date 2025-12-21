import { useState, useEffect } from 'react';
import { Bell, ChevronLeft, ChevronRight, Snowflake, AlertCircle, Clock } from 'lucide-react';

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      type: 'urgent',
      icon: <AlertCircle size={24} />,
      title: 'Reindeer Drill',
      message: 'Flight practice at 14:00. Rudolf is leading the formation.',
      colorClass: 'bg-red-500/80', // Цвят за иконата
    },
    {
      id: 2,
      type: 'info',
      icon: <Snowflake size={24} />,
      title: 'Weather Alert',
      message: 'Heavy snow expected in Sector 7. Production speed increased.',
      colorClass: 'bg-blue-500/80',
    },
    {
      id: 3,
      type: 'reminder',
      icon: <Clock size={24} />,
      title: 'Break Time',
      message: 'Hot cocoa will be served in the main hall in 30 minutes.',
      colorClass: 'bg-amber-500/80',
    },
  ];

  const [currentNotice, setCurrentNotice] = useState(0);

  // Auto-rotate logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [notices.length]);

  const nextNotice = () => setCurrentNotice((prev) => (prev + 1) % notices.length);
  const prevNotice = () => setCurrentNotice((prev) => (prev === 0 ? notices.length - 1 : prev - 1));

  return (
    <div className="w-full max-w-5xl mx-auto mb-10">
      {/* Заглавие */}
      <div className="flex items-center gap-2 mb-4 justify-center text-blue-100/90">
        <Bell size={16} />
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest drop-shadow-sm">
          Workshop Notices
        </span>
      </div>
      
      {/* Основен "Леден" контейнер */}
      <div className="relative group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/25 transition-all duration-300">
        
        <div className="relative p-6 min-h-[160px] flex items-center justify-center">
          
          {/* Лява стрелка (Светла) */}
          <button 
            onClick={prevNotice}
            className="absolute left-2 sm:left-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all z-20"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Съдържание */}
          <div className="flex flex-col items-center text-center px-8 sm:px-12 transition-all duration-500 ease-in-out">
             {/* Икона с динамичен цвят (като при картите) */}
             <div className={`mb-3 p-3 rounded-2xl shadow-inner text-white ${notices[currentNotice].colorClass} transition-colors duration-500`}>
                {notices[currentNotice].icon}
             </div>
             
             {/* Текст - вече е бял */}
             <h4 className="text-white font-black text-lg sm:text-xl tracking-wide drop-shadow-md mb-1">
               {notices[currentNotice].title}
             </h4>
             <p className="text-blue-100 text-sm sm:text-base font-medium drop-shadow-sm leading-relaxed">
               {notices[currentNotice].message}
             </p>
          </div>

          {/* Дясна стрелка (Светла) */}
          <button 
            onClick={nextNotice}
            className="absolute right-2 sm:right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all z-20"
          >
            <ChevronRight size={28} />
          </button>

          {/* Индикатори (точки) - бели */}
          <div className="absolute bottom-4 flex gap-1.5">
            {notices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentNotice(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                  idx === currentNotice ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;