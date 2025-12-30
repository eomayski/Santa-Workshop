import { useState, useMemo, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp, Check, X, Eye, PackageOpen } from 'lucide-react';
import useTitle from '../../hooks/useTitle.js';
import { useToys } from '../../hooks/useToys.js';
import { Link } from 'react-router';
import Pagination from '../pagination/Pagination.jsx';
import ToysListSkeleton from './ToysListSkeleton.jsx';

const ToysList = () => {
    useTitle('Toys')
    
    // --- State & Logic ---
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterInStock, setFilterInStock] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const { data: toys, error, isPending } = useToys();
    const [page, setPage] = useState(1);
    const limit = 5;

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

    const processedToys = useMemo(() => {
            if (!toys || typeof toys !== 'object' || Object.keys(toys).length === 0) return [];
            let data = Object.entries(toys).map(([id, toy]) => ({ ...toy, id }));

            if (filterCategory !== "All") data = data.filter(toy => toy.category === filterCategory);
            if (filterInStock) data = data.filter(toy => toy.inStock);

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
            return data;
    }, [toys, filterCategory, filterInStock, sortConfig]);

    const CATEGORIES = useMemo(() => {
        if (!toys || Object.keys(toys).length === 0) return new Set();
        const categories = new Set();
        Object.values(toys).forEach(toy => { if (toy.category) categories.add(toy.category); });
        return categories;
    }, [toys]);

    const SortIcon = ({ columnKey }) => (
        <span className={`inline-block ml-1 transition-opacity ${sortConfig.key === columnKey ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'}`}>
            {sortConfig.key === columnKey && sortConfig.direction === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </span>
    );

    const handlePageForward = () => { if (page * limit < processedToys.length) setPage(prev => prev + 1); }
    const handlePageBackward = () => { setPage(prev => (prev > 1 ? prev - 1 : 1)); }
    const itemsToShow = useMemo(() => {
        const first = (page - 1) * limit;
        return processedToys.length ? processedToys.slice(first, first + limit) : [];
    }, [page, limit, processedToys]);
    
    useEffect(() => { setPage(1); }, [filterCategory, filterInStock]);

    return (
        <div className="w-full min-w-0">

            {isPending && <ToysListSkeleton />}

            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                    <p className="font-bold">Error loading toys:</p>
                    <p>{error.message}</p>
                </div>
            )}

            {!isPending && !error && (
                <>
                {/* --- HEADER CONTROLS --- */}
                <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2 text-white">
                        <PackageOpen className="text-blue-200" />
                        <h2 className="text-xl font-bold tracking-wide">Inventory</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                        <div className="relative w-full sm:w-48 group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"> <Filter size={16} /> </div>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-black/20 hover:bg-black/30 border border-white/20 rounded-xl text-white appearance-none outline-none focus:border-white/50 transition-all cursor-pointer text-sm"
                            >
                                <option value="All" className="bg-slate-800">All Categories</option>
                                {Array.from(CATEGORIES).map(cat => (
                                    <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"> <ChevronDown size={16} /> </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer group select-none bg-black/10 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                            <div className="relative">
                                <input type="checkbox" checked={filterInStock} onChange={() => setFilterInStock(!filterInStock)} className="peer sr-only" />
                                <div className="w-5 h-5 rounded border-2 border-white/30 bg-white/5 peer-checked:bg-green-500 peer-checked:border-green-400 transition-all shadow-inner"></div>
                                <Check size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity font-bold" strokeWidth={4} />
                            </div>
                            <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors">In Stock</span>
                        </label>
                    </div>
                </div>

                {/* --- TABLE & PAGINATION CONTAINER --- */}
                {/* Събираме таблицата и паджинейшъна в една "карта", но паджинейшъна е под скролващия се див */}
                <div className="rounded-[20px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-0 overflow-hidden">
                    
                    {/* SCROLLABLE TABLE AREA */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[320px]">
                            <thead>
                                <tr className="bg-white/10 text-blue-100 border-b border-white/20 text-[10px] sm:text-xs uppercase tracking-wider">
                                    
                                    {/* 1. NAME */}
                                    <th onClick={() => handleSort('name')} className="p-3 sm:p-4 font-bold cursor-pointer hover:bg-white/10 transition-colors select-none w-[40%]">
                                        <div className="flex items-center group">
                                            Toy Name <SortIcon columnKey="name" />
                                        </div>
                                    </th>
                                    
                                    {/* 2. CATEGORY (Hidden on mobile) */}
                                    <th className="p-4 font-bold hidden sm:table-cell w-[20%]">Category</th>
                                    
                                    {/* 3. DIFFICULTY */}
                                    <th onClick={() => handleSort('difficulty')} className="p-2 sm:p-4 font-bold cursor-pointer hover:bg-white/10 transition-colors select-none text-left w-[20%]">
                                        <div className="flex items-center group">
                                            {/* Mobile: Diff, Desktop: Difficulty */}
                                            <span className="sm:hidden">Diff</span>
                                            <span className="hidden sm:inline">Difficulty</span>
                                            <SortIcon columnKey="difficulty" />
                                        </div>
                                    </th>
                                    
                                    {/* 4. STATUS */}
                                    <th className="p-2 sm:p-4 font-bold text-center w-[10%]">
                                        Status
                                    </th>
                                    
                                    {/* 5. ACTION */}
                                    <th className="p-2 sm:p-4 font-bold text-right w-[10%]">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="text-white text-sm">
                                {itemsToShow.length > 0 ? (
                                    itemsToShow.map((toy) => (
                                        <tr key={toy.id} className="border-b border-white/10 hover:bg-white/10 transition-colors group">
                                            
                                            {/* Name & Category Stacked */}
                                            <td className="p-3 sm:p-4 align-middle">
                                                <div className="flex flex-col leading-tight">
                                                    <span className="font-semibold text-sm sm:text-base text-white/95">
                                                        {toy.name}
                                                    </span>
                                                    <span className="text-[10px] text-blue-200/70 sm:hidden mt-0.5">
                                                        {toy.category}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Category (Desktop) */}
                                            <td className="p-4 hidden sm:table-cell align-middle">
                                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-blue-100 shadow-sm">
                                                    {toy.category}
                                                </span>
                                            </td>

                                            {/* Difficulty */}
                                            <td className="p-2 sm:p-4 align-middle">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold border whitespace-nowrap ${
                                                    toy.difficulty === 'Easy' ? 'bg-green-500/10 border-green-400/20 text-green-200' :
                                                    toy.difficulty === 'Medium' ? 'bg-amber-500/10 border-amber-400/20 text-amber-200' :
                                                    'bg-red-500/10 border-red-400/20 text-red-200'
                                                }`}>
                                                    {/* ТОЧКАТА: hidden on mobile, block on sm+ */}
                                                    <span className={`hidden sm:block w-1.5 h-1.5 flex-shrink-0 rounded-full ${
                                                        toy.difficulty === 'Easy' ? 'bg-green-400' :
                                                        toy.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-red-400'
                                                    }`}></span>
                                                    
                                                    {/* ТЕКСТЪТ: Винаги се вижда целия */}
                                                    <span>{toy.difficulty}</span>
                                                </span>
                                            </td>

                                            {/* Status Icon Only */}
                                            <td className="p-2 sm:p-4 align-middle text-center">
                                                {toy.inStock ? (
                                                    <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 shadow-sm">
                                                        <Check size={16} strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 shadow-sm">
                                                        <X size={16} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </td>

                                            {/* Action Button */}
                                            <td className="p-2 sm:p-4 text-right align-middle">
                                                <Link to={`/toys/${toy.id}`}>
                                                    <button className="inline-flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 bg-white/5 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 rounded-lg transition-all shadow-sm active:scale-95 ml-auto">
                                                        <Eye size={16} />
                                                        <span className="hidden sm:inline ml-2 text-xs font-bold">Details</span>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-white/50">
                                            <PackageOpen size={32} className="mx-auto mb-2 opacity-40" />
                                            <p className="text-xs sm:text-sm">No toys found.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION: Извън overflow-x-auto, но вътре в картата */}
                    <div className="border-t border-white/10 p-4 bg-white/5">
                        <Pagination 
                            total={processedToys.length} 
                            pageForward={handlePageForward} 
                            pageBackward={handlePageBackward} 
                            itemsToShow={itemsToShow.length} 
                            page={page} 
                            limit={limit} 
                            itemsName={'toys'} 
                        />
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default ToysList;