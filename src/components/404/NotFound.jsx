import { Home, ArrowLeft, Snowflake, Search } from 'lucide-react';
import { Link } from 'react-router';
import useTitle from '../../hooks/useTitle.js';

const NotFound = () => {
    useTitle('Not Found')
    
    return (
        <>
            {/* --- 404 Glass Card --- */}
            <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/30 rounded-[40px] shadow-2xl p-8 sm:p-12 text-center flex flex-col items-center">

                {/* Decorative Top Icon */}
                <div className="mb-6 p-4 bg-white/10 rounded-full border border-white/20 shadow-inner animate-bounce">
                    <Search size={48} className="text-white/80" strokeWidth={2.5} />
                </div>

                {/* The "404" Number with a Snowflake as the '0' */}
                <div className="relative flex items-center justify-center gap-2 mb-4">
                    <span className="text-8xl sm:text-9xl font-black text-white drop-shadow-xl tracking-tighter">4</span>

                    {/* Animated Snowflake replacing the '0' */}
                    <div className="relative">
                        <Snowflake
                            size={80}
                            className="text-blue-200 animate-[spin_10s_linear_infinite] drop-shadow-[0_0_15px_rgba(191,219,254,0.6)]"
                            strokeWidth={1.5}
                            />
                        {/* Center dot for visual weight */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                        </div>
                    </div>

                    <span className="text-8xl sm:text-9xl font-black text-white drop-shadow-xl tracking-tighter">4</span>
                </div>

                {/* Text Content */}
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    Lost in a Blizzard?
                </h2>

                <p className="text-lg text-blue-100 mb-10 max-w-md font-medium leading-relaxed drop-shadow-md">
                    Even Rudolph can't find the page you are looking for. It might have been buried under the snow or moved to the Naughty List.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => window.history.back()}
                        className="group px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                        >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>

                    <Link to="/">
                    <button
                        className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                        >
                        <Home size={20} />
                        Return to Workshop
                    </button>
                        </Link>
                </div>

                {/* Footer Note */}
                <div className="mt-8 pt-6 border-t border-white/10 w-full">
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                        Error Code: FROZEN_ASSET
                    </p>
                </div>

            </div>
        </>
    );
};

export default NotFound;