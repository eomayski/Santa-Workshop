import { useState, useEffect } from 'react';
import { Snowflake, Clock } from 'lucide-react';

const ChristmasCountdown = () => {
  // --- Logic: Calculate Time Left ---
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Месеците в JS започват от 0 (11 е Декември)
    let christmasDate = new Date(currentYear, 11, 25); 

    // Ако Коледа вече е минала тази година, гледаме за следващата
    if (now > christmasDate) {
      christmasDate = new Date(currentYear + 1, 11, 25);
    }

    const difference = christmasDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // --- Effect: Update Timer ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Помощен компонент за едно "ледено блокче" време
  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl min-w-[80px] sm:min-w-[100px] flex-1 relative overflow-hidden group">
      {/* Decorative Shine */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      
      {/* Number */}
      <div className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-1 tabular-nums group-hover:scale-110 transition-transform duration-300">
        {value.toString().padStart(2, '0')}
      </div>
      
      {/* Label */}
      <div className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mb-10">
      
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6 text-white/80">
        <Clock size={18} className="animate-pulse" />
        <span className="font-bold uppercase tracking-[0.2em] text-sm">Time until Santa Arrives</span>
      </div>

      {/* --- Countdown Grid --- */}
      <div className="flex gap-3 sm:gap-6 justify-center">
        
        <TimeBox value={timeLeft.days} label="Days" />
        
        {/* Separator (Optional visually, using flex gap instead usually looks cleaner in modern UI, but here is a subtle dot) */}
        <div className="hidden sm:flex flex-col justify-center pb-4">
            <span className="text-4xl text-white/30 font-black animate-pulse">:</span>
        </div>

        <TimeBox value={timeLeft.hours} label="Hours" />

        <div className="hidden sm:flex flex-col justify-center pb-4">
            <span className="text-4xl text-white/30 font-black animate-pulse">:</span>
        </div>

        <TimeBox value={timeLeft.minutes} label="Mins" />

        <div className="hidden sm:flex flex-col justify-center pb-4">
            <span className="text-4xl text-white/30 font-black animate-pulse">:</span>
        </div>

        <TimeBox value={timeLeft.seconds} label="Secs" />
        
      </div>

      {/* Footer Message */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium">
           <Snowflake size={12} className="animate-spin-slow" />
           The workshop is working 24/7
           <Snowflake size={12} className="animate-spin-slow" />
        </div>
      </div>

    </div>
  );
};

export default ChristmasCountdown;