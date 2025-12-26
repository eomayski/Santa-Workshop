import {ArrowLeft, Check, X, Activity} from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useToggleToyStock, useToy } from '../../hooks/useToys.js';
import useTitle from '../../hooks/useTitle.js';

const ToyDetails = () => {
    const { toyId } = useParams()
    const { data: toy, error, isPending } = useToy(toyId);
    const { mutate: toggleStock } = useToggleToyStock();

    useTitle(toy?.name)

    
    return (
        <div className="w-full max-w-5xl mx-auto p-4 mb-20">
            {/* Loading State */}
            {isPending && (
                <div className="text-center py-12">
                    <div className="inline-block text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                        <p>Loading toy...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                    <p className="font-bold">Error loading the toy:</p>
                    <p>{error.message}</p>
                </div>
            )}


            {/* --- Navigation Bar --- */}
            {!isPending && !error && (
                <>
                    <div className="rounded-[40px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden flex flex-col md:flex-row">

                        {/* === Left Column: Image & Status Control === */}
                        <div className="w-full md:w-5/12 p-6 sm:p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-white/10 bg-black/10">

                            {/* Image Container */}
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/20 shadow-inner group">
                                <img
                                    src={toy.image || '/images/placeholderToy.webp'}
                                    alt={toy.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                {/* Status Badge floating on image */}
                                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full border backdrop-blur-md font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 ${toy.inStock
                                    ? 'bg-green-500/80 border-green-400 text-white'
                                    : 'bg-red-500/80 border-red-400 text-white'
                                    }`}>
                                    {toy.inStock ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                                    {toy.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>

                            {/* Stock Toggle Control Panel */}
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white font-bold text-sm uppercase">Availability Status</span>
                                </div>

                                <button
                                    onClick={() => toggleStock({ id: toyId, inStock: !toy.inStock })}
                                    className={`w-full relative h-12 rounded-xl transition-all duration-300 border flex items-center px-1 shadow-inner ${toy.inStock
                                        ? 'bg-green-500/20 border-green-500/50'
                                        : 'bg-red-500/20 border-red-500/50'
                                        } cursor-pointer`}
                                >
                                    {/* Background Text Labels */}
                                    <div className="absolute inset-0 flex justify-between items-center px-4 text-xs font-bold uppercase pointer-events-none">
                                        <span className={toy.inStock ? 'text-white/40' : 'text-white'}>Out</span>
                                        <span className={toy.inStock ? 'text-white' : 'text-white/40'}>In Stock</span>
                                    </div>

                                    {/* Sliding Thumb */}
                                    <div className={`h-9 w-1/2 rounded-lg bg-white shadow-lg flex items-center justify-center transition-all duration-300 transform ${toy.inStock ? 'translate-x-[96%]' : 'translate-x-0'
                                        }`}>
                                        {toy.inStock
                                            ? <Check size={20} className="text-green-600" strokeWidth={3} />
                                            : <X size={20} className="text-red-600" strokeWidth={3} />
                                        }
                                    </div>
                                </button>
                                <p className="text-center text-white/50 text-xs mt-3">
                                    Click to toggle availability for elves.
                                </p>
                            </div>
                        </div>

                        {/* === Right Column: Info & Details === */}
                        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col">

                            {/* Header Info */}
                            <div className="mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="inline-block text-blue-200 text-sm font-bold uppercase tracking-widest mb-2 bg-blue-500/20 px-3 py-1 rounded-lg border border-blue-400/20">
                                            {toy.category}
                                        </span>
                                        <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg leading-tight mb-2">
                                            {toy.name}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-auto">

                                {/* Difficulty */}
                                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl text-white ${toy.difficulty === 'Easy' ? 'bg-green-400/30' :
                                        toy.difficulty === 'Medium' ? 'bg-amber-400/30' : 'bg-red-400/30'}`}>
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase">Difficulty</p>
                                        <p className="text-white font-bold">{toy.difficulty}</p>
                                    </div>
                                </div>

                                <div>
                                    <Link to={'/toys'}>
                                        <button className="px-6 py-3 h-full bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                            <ArrowLeft size={20} />
                                            Back to Inventory
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ToyDetails;