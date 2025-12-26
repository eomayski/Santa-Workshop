import { Gift, Package, Users } from 'lucide-react';
import NoticeBoard from './NoticeBoard.jsx';
import { useToys } from '../../hooks/useToys.js';
import { useOrders } from '../../hooks/useOrders.js';

const Hero = () => {
    const { data: toys, error, isPending } = useToys();
    const { data: orders } = useOrders();


    return (
            <div className="w-full max-w-6xl mx-auto p-4 mb-20">


            {/* Dark Overlay for contrast */}
            <div className="absolute inset-0 bg-slate-900/40"></div>

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
                    <div className="group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 flex flex-col items-center shadow-lg hover:bg-white/25 transition-all duration-300">
                        <div className="p-3 bg-blue-500/90 text-white rounded-2xl mb-3 shadow-inner">
                            <Gift size={28} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Toys</h3>
                        <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">{isPending ? 'Toys Loading...' : error ? "Error on toys cont" : Object.keys(toys).length}</p>
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
}

export default Hero