import { useState, useEffect } from 'react';
import { Snowflake, Clock } from 'lucide-react';

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center 
                  p-4 rounded-2xl 
                  bg-white/10 backdrop-blur-md border border-white/20 shadow-lg 
                  min-w-0 w-full aspect-square sm:aspect-auto sm:h-auto" // Квадратни на мобилно
  >
    <div className="font-black text-white drop-shadow-lg tabular-nums leading-none
                    text-4xl        /* Mobile: Големи цифри */
                    sm:text-5xl     /* Tablet */
                    md:text-6xl"    /* Desktop */
    >
      {String(value).padStart(2, '0')}
    </div>
    
    <div className="font-medium text-blue-200 uppercase tracking-widest mt-1
                    text-[10px] sm:text-xs"
    >
      {label}
    </div>
  </div>
);

const ChristmasCountdown = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmasDate = new Date(currentYear, 11, 25); 
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-10">
      
      <div className="flex items-center justify-center gap-2 mb-6 text-white/90">
        <Clock size={16} className="animate-pulse" />
        <span className="font-bold uppercase tracking-[0.2em] text-xs sm:text-sm drop-shadow-md">
          Time until Santa Arrives
        </span>
      </div>


      <div className="grid grid-cols-2 gap-3 md:flex md:justify-center md:gap-6">
        
        <TimeBox value={timeLeft.days} label="Days" />
        
        <div className="hidden md:flex flex-col justify-start pt-4">
            <span className="text-4xl text-white/30 font-black animate-ping">:</span>
        </div>

        <TimeBox value={timeLeft.hours} label="Hrs" />

        <div className="hidden md:flex flex-col justify-start pt-4">
            <span className="text-4xl text-white/30 font-black animate-ping">:</span>
        </div>

        <TimeBox value={timeLeft.minutes} label="Mins" />

        <div className="hidden md:flex flex-col justify-start pt-4">
            <span className="text-4xl text-white/30 font-black animate-ping">:</span>
        </div>

        <TimeBox value={timeLeft.seconds} label="Secs" />
        
      </div>

      <div className="mt-8 text-center px-4">
        <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] sm:text-xs font-medium backdrop-blur-sm">
           <Snowflake size={12} className="animate-spin-slow text-blue-300" />
           <span>Workshop Status: Active</span>
           <Snowflake size={12} className="animate-spin-slow text-blue-300" />
        </div>
      </div>

    </div>
  );
};

export default ChristmasCountdown;  