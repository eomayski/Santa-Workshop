import React, { useState } from 'react';
import { Menu, X, LogIn, LogOut, UserPlus, Gift, Package, Users, Snowflake, Sun } from 'lucide-react';
import { Link } from 'react-router';
import SnowOverlay from '../snow/SnowOverlay.jsx';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSnowing, setIsSnowing] = useState(true);

    const navLinks = [
        { name: 'Toys', icon: <Gift size={18} /> },
        { name: 'Orders', icon: <Package size={18} /> },
        { name: 'Elves', icon: <Users size={18} /> },
    ];

    // Функция за превключване на състоянието
    const toggleSnow = () => setIsSnowing(!isSnowing);

    return (
        <div className="relative w-full pt-4 px-4 z-50 mb-10">
            {isSnowing && <SnowOverlay />}

            {/* --- Основен Хедър --- */}
            <header className="relative z-50 mx-auto max-w-6xl rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl px-6 py-3 flex justify-between items-center transition-all">

                {/* Лого */}
                <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
                    <Link to={'/'}>
                        <h2 className="text-white font-black text-xl tracking-tight drop-shadow-lg leading-none">
                            Santa's <span className="text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Workshop</span>
                        </h2>
                    </Link>
                </div>

                {/* Desktop Навигация */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={`/${link.name.toLowerCase()}`}
                            className="px-4 py-2 text-blue-100 hover:text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 rounded-xl hover:bg-white/10 transition-all duration-300 drop-shadow-sm"
                        >
                            <span className="opacity-70">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-3">
                    
                    {/* --- TOGGLE BUTTON (SUN / SNOW) --- */}
                    <button
                        onClick={toggleSnow}
                        className={`
                            relative flex items-center justify-center p-2 rounded-xl transition-all duration-500 ease-out border overflow-hidden
                            ${isSnowing 
                                ? 'bg-blue-500/20 text-blue-200 border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                                : 'bg-amber-500/20 text-amber-300 border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                            }
                        `}
                        title={isSnowing ? "Clear Weather" : "Let it Snow"}
                    >
                        {/* Анимирана смяна на иконите */}
                        <div className={`transition-transform duration-500 ${isSnowing ? 'rotate-0 scale-100' : 'rotate-180 scale-0 absolute'}`}>
                            <Snowflake size={20} />
                        </div>
                        <div className={`transition-transform duration-500 ${!isSnowing ? 'rotate-0 scale-100' : '-rotate-180 scale-0 absolute'}`}>
                            <Sun size={20} />
                        </div>
                    </button>

                    <div className="h-6 w-px bg-white/20 mx-1"></div>

                    {/* Auth Buttons */}
                    {isLoggedIn ? (
                        <button
                            onClick={() => setIsLoggedIn(false)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    ) : (
                        <>
                            <button className="flex items-center gap-2 px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl font-bold text-sm transition-all">
                                <UserPlus size={18} />
                                Register
                            </button>
                            <button
                                onClick={() => setIsLoggedIn(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-900/30 transition-all active:scale-95"
                            >
                                <LogIn size={18} />
                                Login
                            </button>
                        </>
                    )}
                </div>

                {/* Мобилен контрол */}
                <div className="md:hidden flex items-center gap-2">
                     {/* Mobile Toggle Button */}
                     <button
                        onClick={toggleSnow}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                            isSnowing ? 'text-blue-200 bg-blue-500/10' : 'text-amber-300 bg-amber-500/10'
                        }`}
                    >
                        {isSnowing ? <Snowflake size={24} /> : <Sun size={24} />}
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

            </header>

            {/* Мобилно Меню */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 px-4 z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="mx-auto max-w-6xl rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden p-4 flex flex-col gap-2">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={`#${link.name.toLowerCase()}`}
                                className="px-4 py-3 text-white hover:bg-white/10 rounded-2xl font-bold flex items-center gap-3 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-white/70">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-px bg-white/20 my-2 mx-4"></div>

                        {/* Мобилен Switch за времето */}
                        <button 
                            onClick={toggleSnow}
                            className="px-4 py-3 hover:bg-white/10 rounded-2xl font-bold flex items-center justify-between transition-colors group"
                        >
                            <div className={`flex items-center gap-3 transition-colors ${isSnowing ? 'text-blue-200' : 'text-amber-300'}`}>
                                {isSnowing ? <Snowflake size={18} /> : <Sun size={18} />}
                                <span>{isSnowing ? 'Snowing' : 'Clear Sky'}</span>
                            </div>
                            
                            {/* Visual Toggle Track */}
                            <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isSnowing ? 'bg-blue-500/50' : 'bg-amber-500/50'}`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${isSnowing ? 'left-7' : 'left-1'}`}></div>
                            </div>
                        </button>

                        <div className="flex flex-col gap-2 p-2 mt-2">
                            {isLoggedIn ? (
                                <button
                                    onClick={() => { setIsLoggedIn(false); setIsMobileMenuOpen(false); }}
                                    className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-2xl font-bold transition-all"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            ) : (
                                <>
                                    <button className="flex items-center justify-center gap-2 px-5 py-3 text-white hover:bg-white/10 rounded-2xl font-bold transition-all">
                                        <UserPlus size={18} /> Register
                                    </button>
                                    <button
                                        onClick={() => { setIsLoggedIn(true); setIsMobileMenuOpen(false); }}
                                        className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-bold shadow-lg transition-all"
                                    >
                                        <LogIn size={18} /> Login
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;