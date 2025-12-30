import Slider from 'react-slick';
import { Bell, ChevronLeft, ChevronRight, Snowflake, AlertCircle, Clock, Gift, Wrench } from 'lucide-react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all z-20 cursor-pointer"
    >
      <ChevronRight size={28} />
    </button>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all z-20 cursor-pointer"
    >
      <ChevronLeft size={28} />
    </button>
  );
};

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      type: 'urgent',
      icon: <AlertCircle size={24} />,
      title: 'Reindeer Drill',
      message: 'Flight practice at 14:00. Rudolf is leading the formation.',
      colorClass: 'bg-red-500/80',
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
    {
      id: 4,
      type: 'success',
      icon: <Gift size={24} />,
      title: 'Toy Production',
      message: 'Target reached! 500,000 teddy bears wrapped and ready.',
      colorClass: 'bg-emerald-500/80',
    },
    {
      id: 5,
      type: 'maintenance',
      icon: <Wrench size={24} />,
      title: 'Sleigh Maintenance',
      message: 'Engineers report landing gear check complete. All systems green.',
      colorClass: 'bg-purple-500/80',
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    swipe: true,
    appendDots: dots => (
      <div style={{ bottom: "10px" }}>
        <ul className="flex justify-center gap-1.5 items-center m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="custom-dot h-1.5 rounded-full transition-all duration-300 bg-white/40 hover:bg-white/60 cursor-pointer" />
    )
  };

  return (

    <div className="w-full max-w-4xl mx-auto mb-10 px-4 overflow-hidden">
      
      <style>{`
        .slick-dots li { width: auto; margin: 0; }
        .slick-dots li.slick-active .custom-dot { width: 24px; background-color: white; }
        .slick-dots li .custom-dot { width: 6px; }
      `}</style>

      <div className="flex items-center gap-2 mb-4 justify-center text-blue-100/90">
        <Bell size={16} />
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest drop-shadow-sm">
          Workshop Notices
        </span>
      </div>
      

      <div className="relative rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/25 transition-all duration-300">
        
       
        <div className="w-0 min-w-full">
            <Slider {...settings} className="py-6 pb-10"> 
            {notices.map((notice) => (
                <div key={notice.id} className="outline-none"> 
                

                <div className="flex flex-col items-center text-center px-2 sm:px-16">
                    
                    <div className={`mb-3 p-2 sm:p-3 rounded-2xl shadow-inner text-white ${notice.colorClass} transition-colors duration-500 transform scale-90 sm:scale-100`}>
                    {notice.icon}
                    </div>
                    
                    <h4 className="text-white font-black text-lg sm:text-xl tracking-wide drop-shadow-md mb-1 break-words w-full">
                    {notice.title}
                    </h4>
                    
                    <p className="text-blue-100 text-sm sm:text-base font-medium drop-shadow-sm leading-relaxed max-w-lg mx-auto break-words px-2">
                    {notice.message}
                    </p>
                </div>
                </div>
            ))}
            </Slider>
        </div>

      </div>
    </div>
  );
};

export default NoticeBoard;