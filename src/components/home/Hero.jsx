import { Users } from 'lucide-react';
import NoticeBoard from './NoticeBoard.jsx';
import StatusCard from './StatusCard.jsx';

const Hero = () => {
    return (

        <>
            {/* Main Glass Panel */}
            <div className="relative mx-auto z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/30 rounded-[40px] shadow-2xl overflow-hidden p-8 sm:p-10 text-center">

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
                <NoticeBoard />
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    
                    {/* Card: Total Toys */}
                    <StatusCard card={"toys"}/>

                    {/* Card: Pending Orders */}
                    <StatusCard card={"orders"}/>

                    {/* Card: Active Elves */}
                    <StatusCard card={"elves"}/>
                </div>

            </div>
        </>

    );
}

export default Hero