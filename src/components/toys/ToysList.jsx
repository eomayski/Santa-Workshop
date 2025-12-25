import React, { useState, useMemo, useEffect } from 'react';
import {
    Search, Filter, ChevronDown, ChevronUp,
    Check, X, Eye, PackageOpen
} from 'lucide-react';
import useTitle from '../../hooks/useTitle.js';
import { useToys } from '../../hooks/useToys.js';

// --- Примерни Данни ---

const ToysList = () => {
    useTitle('Toys')
    
    // State
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterInStock, setFilterInStock] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const { data: toys, isLoading, error, isPending } = useToys();
    

    // --- Helpers за Сортиране ---
    const getDifficultyWeight = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 1;
            case 'Medium': return 2;
            case 'Hard': return 3;
            default: return 0;
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // --- Filtering and Sorting ---
    const processedToys = useMemo(() => {
        try {
            if (!toys || typeof toys !== 'object' || Object.keys(toys).length === 0) return [];
            
            let data = Object.entries(toys).map(([id, toy]) => ({ ...toy, id }));
            console.log('Initial data:', data);

            // 1. Filtering
            if (filterCategory !== "All") {
                data = data.filter(toy => toy.category === filterCategory);
            }
            if (filterInStock) {
                data = data.filter(toy => toy.inStock);
            }

            // 2. Sorting
            if (sortConfig.key) {
                data.sort((a, b) => {
                    let aValue = a[sortConfig.key];
                    let bValue = b[sortConfig.key];

                    if (sortConfig.key === 'difficulty') {
                        aValue = getDifficultyWeight(aValue);
                        bValue = getDifficultyWeight(bValue);
                    }

                    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            console.log('Final processedToys:', data);
            return data;
        } catch (err) {
            console.error('Error in processedToys:', err);
            return [];
        }
    }, [toys, filterCategory, filterInStock, sortConfig]);

    const CATEGORIES = useMemo(() => {
        if (!toys || Object.keys(toys).length === 0) return new Set();
        
        const categories = new Set();
        Object.values(toys).forEach(toy => {
            if (toy.category) {
                categories.add(toy.category);
            }
        });
        return categories;
    }, [toys]);
    // --- Sort Arrow Component ---
    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return <div className="w-4 h-4 opacity-0" />;
        return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    console.log(processedToys);
    console.log(CATEGORIES);
    
    
    return (
        <div className="w-full max-w-6xl mx-auto p-4 mb-20">

            {/* Loading State */}
            {isPending && (
                <div className="text-center py-12">
                    <div className="inline-block text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                        <p>Loading toys...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                    <p className="font-bold">Error loading toys:</p>
                    <p>{error.message}</p>
                </div>
            )}

            {/* Main Content - Only show if not loading and no error */}
            {!isPending && !error && (
                <>
                <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">

                {/* Title */}
                <div className="flex items-center gap-2 text-white">
                    <PackageOpen className="text-blue-200" />
                    <h2 className="text-xl font-bold tracking-wide">Toy Inventory</h2>
                </div>

                {/* Filters Group */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">

                    {/* Category Dropdown */}
                    <div className="relative w-full sm:w-48 group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                            <Filter size={16} />
                        </div>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-black/20 hover:bg-black/30 border border-white/20 rounded-xl text-white appearance-none outline-none focus:border-white/50 transition-all cursor-pointer"
                        >
                            <option value="All" className="bg-slate-800 text-white">All</option>
                            {Array.from(CATEGORIES).map(cat => (
                                <option key={cat} value={cat} className="bg-slate-800 text-white">
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    {/* In Stock Checkbox (Custom Glass) */}
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={filterInStock}
                                onChange={() => setFilterInStock(!filterInStock)}
                                className="peer sr-only"
                            />
                            <div className="w-6 h-6 rounded-lg border-2 border-white/30 bg-white/5 peer-checked:bg-green-500 peer-checked:border-green-400 transition-all shadow-inner"></div>
                            <Check
                                size={14}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity font-bold"
                                strokeWidth={4}
                            />
                        </div>
                        <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors">
                            In Stock Only
                        </span>
                    </label>
                </div>
            </div>

            {/* --- Table Container (Ice Panel) --- */}
            <div className="overflow-hidden rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        {/* Table Header */}
                        <thead>
                            <tr className="bg-white/10 text-blue-100 border-b border-white/20">
                                <th
                                    onClick={() => handleSort('name')}
                                    className="p-5 font-bold uppercase text-xs tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none"
                                >
                                    <div className="flex items-center gap-2">
                                        Toy Name <SortIcon columnKey="name" />
                                    </div>
                                </th>
                                <th className="p-5 font-bold uppercase text-xs tracking-wider">
                                    Category
                                </th>
                                <th
                                    onClick={() => handleSort('difficulty')}
                                    className="p-5 font-bold uppercase text-xs tracking-wider cursor-pointer hover:bg-white/10 transition-colors select-none"
                                >
                                    <div className="flex items-center gap-2">
                                        Difficulty <SortIcon columnKey="difficulty" />
                                    </div>
                                </th>
                                <th className="p-5 font-bold uppercase text-xs tracking-wider text-center">
                                    Status
                                </th>
                                <th className="p-5 font-bold uppercase text-xs tracking-wider text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-white">
                            {processedToys.length > 0 ? (
                                processedToys.map((toy) => (
                                    <tr
                                        key={toy.id}
                                        className="border-b border-white/10 hover:bg-white/10 transition-colors group"
                                    >
                                        <td className="p-5 font-medium">
                                            <div className="text-base">{toy.name}</div>
                                        </td>

                                        <td className="p-5">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-blue-100">
                                                {toy.category}
                                            </span>
                                        </td>

                                        <td className="p-5">
                                            {/* Difficulty Badge Logic */}
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${toy.difficulty === 'Easy' ? 'bg-green-500/20 border-green-400/30 text-green-200' :
                                                    toy.difficulty === 'Medium' ? 'bg-amber-500/20 border-amber-400/30 text-amber-200' :
                                                        'bg-red-500/20 border-red-400/30 text-red-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${toy.difficulty === 'Easy' ? 'bg-green-400' :
                                                        toy.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-red-400'
                                                    }`}></span>
                                                {toy.difficulty}
                                            </span>
                                        </td>

                                        <td className="p-5 text-center">
                                            {toy.inStock ? (
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-300 border border-green-500/30" title="In Stock">
                                                    <Check size={16} />
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-300 border border-red-500/30" title="Out of Stock">
                                                    <X size={16} />
                                                </div>
                                            )}
                                        </td>

                                        <td className="p-5 text-right">
                                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center gap-2 ml-auto">
                                                <span className="text-xs font-bold hidden sm:inline">Details</span>
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // Empty State
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-white/50">
                                        <PackageOpen size={48} className="mx-auto mb-3 opacity-50" />
                                        <p>No toys found matching your filters.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Simple Footer / Pagination placeholder */}
                <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-sm text-white/50">
                    <span>Showing {processedToys.length} toys</span>
                </div>
            </div>
                </>
            )}
        </div>
    );
};

export default ToysList;