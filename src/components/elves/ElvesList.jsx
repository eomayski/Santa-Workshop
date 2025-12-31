import { Zap } from 'lucide-react';
import useTitle from '../../hooks/useTitle.js';
import { useElves } from '../../hooks/useElves.js';
import { useMemo } from 'react';
import { Link } from 'react-router';
import ElvesListSkeleton from './ElvesListSkeleton.jsx';


const ElvesList = () => {
    useTitle('Elves');
    const { data: elves, error, isPending } = useElves();

    const processedElves = useMemo(() => {
        if (!elves || typeof elves !== 'object' || Object.keys(elves).length === 0) return [];

        let data = Object.entries(elves).map(([id, elf]) => ({ ...elf, id }));

        return data;
    }, [elves]);

    const getEnergyColorClass = (level) => {
        if (level >= 80) return 'from-green-400 to-green-500 shadow-green-400/50';
        if (level >= 40) return 'from-amber-400 to-amber-500 shadow-amber-400/50';
        return 'from-red-400 to-red-600 shadow-red-400/50';
    };

    return (
        <>
            {/* Loading State */}
            {isPending && (
                <ElvesListSkeleton />
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                    <p className="font-bold">Error loading elves:</p>
                    <p>{error.message}</p>
                </div>
            )}

            {/* Main Content */}
            {!isPending && !error && (
                <>
                    <div className="w-full max-w-6xl mx-auto p-4 mb-20">

                        {/* Page Title */}
                        <div className="relative z-10 mb-10 text-center">
                            <h1 className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg mb-3">
                                Meet the <span className="text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Elf Team</span>
                            </h1>
                            <p className="text-white drop-shadow-lg text-lg max-w-2xl mx-auto font-medium">
                                The magically tireless crew working behind the scenes to make Christmas happen.
                            </p>
                        </div>

                        {/* --- Grid Container --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {processedElves.map((elf) => {
                                // Check if energy is low
                                const isLowEnergy = elf.energy < 40;

                                return (
                                    <Link key={elf.id} to={`/elves/${elf.id}`}>

                                    <div  className="group relative overflow-hidden rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:border-white/50">

                                        <div className="relative mb-5 w-full max-w-[250px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                            <img
                                                src={elf.image}
                                                alt={elf.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-2 drop-shadow-sm tracking-tight">
                                            {elf.name}
                                        </h3>
                                        <p className="text-blue-100/80 font-bold uppercase tracking-widest text-xs mb-4 px-4 py-1 rounded-full bg-black/20 border border-white/10 inline-block">
                                            {elf.role}
                                        </p>

                                        {/* --- Energy Meter Section --- */}
                                        <div className="w-full mt-auto bg-black/20 rounded-2xl p-2 border border-white/10 backdrop-blur-sm">

                                            <div className="flex justify-between text-xs mb-1 font-bold px-1">

                                                <span className={`flex items-center gap-1 transition-colors ${isLowEnergy ? 'text-red-300 animate-pulse' : 'text-white/90'}`}>
                                                    <Zap
                                                        size={14}
                                                        className={isLowEnergy ? 'text-red-300 fill-red-300' : 'text-yellow-300 fill-yellow-300 drop-shadow-sm'}
                                                    />
                                                    Energy
                                                </span>

                                                <span className={`text-sm transition-colors ${isLowEnergy ? 'text-red-300 animate-pulse' : 'text-white'}`}>
                                                    {elf.energy}%
                                                </span>
                                            </div>

                                            <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden border border-white/5 p-px relative">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out relative overflow-hidden ${getEnergyColorClass(elf.energy)}`}
                                                    style={{ width: `${elf.energy}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                            </Link>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ElvesList;   