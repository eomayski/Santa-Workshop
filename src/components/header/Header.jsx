import React, { useState } from 'react';
import { Menu, X, LogIn, LogOut, UserPlus, Gift, Package, Users } from 'lucide-react';
import { Link } from 'react-router';

const Header = () => {
    // State за симулиране на "Влязъл потребител".
    // В реален проект това ще идва от твоята authentication система.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // State за мобилното меню
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Toys', icon: <Gift size={18} /> },
        { name: 'Orders', icon: <Package size={18} /> },
        { name: 'Elves', icon: <Users size={18} /> },
    ];

    return (
        // Този "outer" div е само за демонстрация на фона,
        // в реалния сайт хедърът ще бъде най-горе в layout-а.
        <div className="relative w-full pt-4 px-4 z-50 mb-10">
            {/* Забележка: Ако използваш този хедър извън Hero компонента, 
         увери се, че зад него има тъмен/шарен фон, за да се види ефектът на стъклото.
       */}

            {/* --- Основен Хедър Контейнер (Плаващ Леден Панел) --- */}
            <header className="mx-auto max-w-6xl rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl px-6 py-3 flex justify-between items-center transition-all">

                {/* Лого / Бранд */}
                <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
                    <Link to={'/'}>
                    <h2 className="text-white font-black text-xl tracking-tight drop-shadow-lg leading-none">
                        Santa's <span className="text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Workshop</span>
                    </h2>
                    </Link>
                </div>

                {/* --- Desktop Навигация (Скрита на мобилни) --- */}
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

                {/* --- Desktop Auth Бутони (Скрити на мобилни) --- */}
                <div className="hidden md:flex items-center gap-3">
                    {isLoggedIn ? (
                        // logged IN state
                        <button
                            onClick={() => setIsLoggedIn(false)} // Симулация на Logout
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    ) : (
                        // logged OUT state
                        <>
                            <button className="flex items-center gap-2 px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl font-bold text-sm transition-all">
                                <UserPlus size={18} />
                                Register
                            </button>
                            <button
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-900/30 transition-all active:scale-95"
                            >
                                <LogIn size={18} />
                                Login
                            </button>
                        </>
                    )}
                </div>

                {/* --- Мобилен Меню Бутон (Хамбургер) --- */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

            </header>

            {/* --- Мобилно Падащо Меню (Леден стил) --- */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 px-4 z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="mx-auto max-w-6xl rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden p-4 flex flex-col gap-2">

                        {/* Мобилни Линкове */}
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.name.toLowerCase()}`}
                                className="px-4 py-3 text-white hover:bg-white/10 rounded-2xl font-bold flex items-center gap-3 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-white/70">{link.icon}</span>
                                {link.name}
                            </a>
                        ))}

                        <div className="h-px bg-white/20 my-2 mx-4"></div>

                        {/* Мобилни Auth Бутони */}
                        <div className="flex flex-col gap-2 p-2">
                            {isLoggedIn ? (
                                <button
                                    onClick={() => { setIsLoggedIn(false); setIsMobileMenuOpen(false); }}
                                    className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-2xl font-bold transition-all"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="flex items-center justify-center gap-2 px-5 py-3 text-white hover:bg-white/10 rounded-2xl font-bold transition-all">
                                        <UserPlus size={18} /> Register
                                    </button>
                                    <button
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