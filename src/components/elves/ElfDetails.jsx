    import { Zap, ListTodo, Coffee, Sparkles, ListCollapse } from 'lucide-react';
    import { useEffect, useState } from 'react';
    import { Link, Outlet, useLocation, useParams } from 'react-router';
    import { useElf } from '../../hooks/useElves.js';

    const ElfDetails = () => {
        const { elfId } = useParams()
        const location = useLocation();
        const { data: elf, error, isPending } = useElf(elfId);
        const [ taskIs, setTasksIs] = useState(location.pathname.endsWith('/tasks'))
        const [elfEnergy, setElfEnergy] = useState(0);


        useEffect(() => {
            if (elf?.energy) {
                setElfEnergy(elf.energy);
            }
        }, [elf?.energy]);

        // --- Logic: Boost Energy ---
        const boostEnergy = () => {
            if (elfEnergy < 100) {
                setElfEnergy(state => state + 10)
            }
        };

        // --- Energy Colors ---
        const getEnergyColorClass = (level) => {
            if (level >= 80) return 'from-green-400 to-green-500 shadow-[0_0_20px_rgba(74,222,128,0.5)]';
            if (level >= 40) return 'from-amber-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.5)]';
            return 'from-red-400 to-red-600 shadow-[0_0_20px_rgba(248,113,113,0.5)]';
        };

        const tasksOpenHandler = () => {
            setTasksIs(!taskIs)
        }

        return (
            <div className="w-full max-w-4xl mx-auto p-4 mb-20">
                {/* Loading State */}
                {isPending && (
                    <div className="text-center py-12">
                        <div className="inline-block text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                            <p>Loading elf...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                        <p className="font-bold">Error loading the elf:</p>
                        <p>{error.message}</p>
                    </div>
                )}


                {/* --- Navigation Bar --- */}
                {!isPending && !error && (
                    <>
                        <div className="rounded-[40px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden mb-6 flex flex-col md:flex-row">

                            {/* --- Main Glass Card --- */}
                            <div className="w-full md:w-5/12 p-6 sm:p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-white/10 bg-black/10">

                                {/* Image */}
                                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img
                                        src={elf.image}
                                        alt={elf.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Energy Control Panel */}
                                <div className="bg-white/10 rounded-3xl p-5 border border-white/10 shadow-inner">
                                    <div className="flex justify-between items-end mb-3">
                                        <label className="flex items-center gap-2 text-white/90 font-bold text-sm">
                                            <Zap size={18} className={elfEnergy < 40 ? "text-red-400 animate-pulse" : "text-yellow-300"} fill="currentColor" />
                                            Energy Level
                                        </label>
                                        <span className={`text-2xl font-black ${elfEnergy < 40 ? 'text-red-300' : 'text-white'}`}>
                                            {elfEnergy}%
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden border border-white/10 p-0.5 mb-6 relative">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out relative ${getEnergyColorClass(elfEnergy)}`}
                                            style={{ width: `${elfEnergy}%` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                                        </div>
                                    </div>

                                    {/* Boost Button */}
                                    <button
                                        onClick={boostEnergy}
                                        disabled={elfEnergy >= 100}
                                        className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg cursor-pointer
                                    ${elfEnergy >= 100
                                                ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/5'
                                                : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white border border-amber-400/50 shadow-orange-900/30'
                                            }`}
                                    >
                                        {elfEnergy >= 100 ? (
                                            <>
                                                <Sparkles size={18} /> Max Energy
                                            </>
                                        ) : (
                                            <>
                                                <Coffee size={18} /> Boost Energy (+10)
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* === Right Column: Info & Tasks === */}
                            <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col">

                                {/* Header Info */}
                                <div className="mb-6">
                                    <span className="inline-block text-blue-200 text-xs font-bold uppercase tracking-widest mb-3 bg-blue-500/20 px-3 py-1 rounded-lg border border-blue-400/20">
                                        {elf.role}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg leading-tight mb-4">
                                        {elf.name}
                                    </h1>
                                    <p className="text-lg text-blue-100/90 leading-relaxed border-l-4 border-white/20 pl-5">
                                        {elf.description}
                                    </p>
                                </div>

                                {/* Action Button: Tasks */}
                                <div className="mt-auto pt-8 border-t border-white/10 ">
                                {!taskIs ? 
                                <Link to={`./tasks`}>
                                    <button
                                        onClick={tasksOpenHandler}
                                        className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg group cursor-pointer">
                                        <ListTodo size={22} className="group-hover:text-blue-200 transition-colors" />
                                        View Assigned Tasks
                                    </button>
                                </Link> : 
                                <Link to={`/elves/${elfId}`}>
                                    <button
                                        onClick={tasksOpenHandler}
                                        className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg group cursor-pointer">
                                        <ListCollapse size={22} className="group-hover:text-blue-200 transition-colors" />
                                        Hide Assigned Tasks
                                    </button>
                                </Link>
                                    }
                                </div>
                            </div>
                        </div>
                        <Outlet context={{elf}}/>
                        </>
                        )};
        </div>
        );
    };

    export default ElfDetails;