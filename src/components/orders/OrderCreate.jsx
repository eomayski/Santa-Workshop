import { Gift, Globe, SendHorizonal, Signal, User } from "lucide-react";
import { useCountries } from "../../hooks/useCountries.js";
import { useToys } from "../../hooks/useToys.js";
import { useEffect, useMemo, useRef, useState } from "react";
import getStyles from "../../utils/getStyles.js";
import { useDebounce } from "../../hooks/useDebounce.js";
import { useCreateOrder } from "../../hooks/useOrders.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useTitle from "../../hooks/useTitle.js";

export default function OrderCreate() {
    useTitle('Create Order')
    const navigate = useNavigate()

    // --- Data Hooks ---
    const { data: countries, error: countriesError, isPending: countriesPending } = useCountries();
    const { data: toys, error: toysError, isPending: toysPending } = useToys();
    const { mutate: createOrder } = useCreateOrder();

    // --- State: Priority ---
    const [priority, setPriority] = useState(null);

    // --- State: Child's Name ---
    const [name, setName] = useState('')

    // --- State: TOYS (Searchable) ---
    const [toyInput, setToyInput] = useState('');
    const [toyId, setToyId] = useState('')
    const debouncedToySearch = useDebounce(toyInput);
    const [isToyOpen, setIsToyOpen] = useState(false);
    const toyWrapperRef = useRef(null);

    // --- State: COUNTRIES (Searchable) ---
    const [countryInput, setCountryInput] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const countryWrapperRef = useRef(null);

    // --- Logic: Filter Toys ---
    const filteredToys = useMemo(() => {
        if (!toys || typeof toys !== 'object') return [];
        
        const data = Object.entries(toys).map(([id, toy]) => ({ ...toy, id }));

        if (!debouncedToySearch || debouncedToySearch.trim() === '') return [];

        return data.filter(toy => toy.name.toLowerCase().includes(debouncedToySearch.toLowerCase())
        );
    }, [toys, debouncedToySearch]);

    // --- Logic: Filter Countries ---
    const filteredCountries = useMemo(() => {
        if (!countries) return [];
        
        let data = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));

        if (countryInput && countryInput.trim() !== '') {
            data = data.filter(c => 
                c.name.common.toLowerCase().includes(countryInput.toLowerCase())
            );
        }
        return data;
    }, [countries, countryInput]);

    // --- Handlers ---
    const handleSelectToy = (name, id) => {
        setToyInput(name);
        setToyId(id)
        setIsToyOpen(false);
    };

    const handleSelectCountry = (country) => {
        setCountryInput(country.name.common);
        setSelectedCountry(country);
        setIsCountryOpen(false);
    };

    const handleSubmit = (formData) => {
        const childName = formData.get('childName');
        let country = formData.get('country')
        const toyId = formData.get('toyId');
        const priority = formData.get('priority')
        
        if (childName.trim().length < 2) {
            toast.error("Child's name must be at least two characters long" )
            return;
        }

        if (!country) {
            toast.error("Country must be selected!" )
            return;
        }

        if (!toyId) {
            toast.error("Toy must be selected!" )
            return;
        }

        if (!priority) {
            toast.error("Priority must be selected!" )
            return;
        }

        country = JSON.parse(country)
        
        const data = {childName, country, toyId, priority}
        
        createOrder(data)

        navigate('/orders')
    }



    // --- Click Outside Effect ---
    useEffect(() => {
        function handleClickOutside(event) {
            if (toyWrapperRef.current && !toyWrapperRef.current.contains(event.target)) {
                setIsToyOpen(false);
            }
            if (countryWrapperRef.current && !countryWrapperRef.current.contains(event.target)) {
                setIsCountryOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [toyWrapperRef, countryWrapperRef]);

    return (
        <>
            {/* --- Main Container --- */}
            <div className="relative text-center rounded-[40px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-8 sm:p-10">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-white drop-shadow-md">Create Order</h2>
                    <p className="text-blue-100 text-sm mt-1">Send a new request to the workshop.</p>
                </div>

                {/* --- Form --- */}
                <form className="space-y-6" action={handleSubmit}>

                    {/* 1. Child Name Input */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                            <User size={14} /> Child's Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="childName"
                                value={name}
                                placeholder="e.g. Timmy Turner"
                                className="w-full bg-black/10 hover:bg-black/20 focus:bg-black/20 border border-white/10 focus:border-white/40 rounded-xl p-4 text-white placeholder-white/30 outline-none transition-all"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* 2. Country Select (Custom) */}
                        <div className="space-y-2" ref={countryWrapperRef}>
                            <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                                <Globe size={14} /> Country
                            </label>
                            <div className="relative w-full">
                                <input type="hidden" name="country" value={selectedCountry ? JSON.stringify(selectedCountry) : ''} />
                                
                                <input
                                    className="w-full appearance-none bg-black/10 hover:bg-black/20 border border-white/10 focus:border-white/40 rounded-xl p-4 pl-12 text-white outline-none transition-all cursor-pointer placeholder-white/30"
                                    type="text"
                                    placeholder="Select Country..."
                                    value={countryInput}
                                    onChange={(e) => {
                                        setCountryInput(e.target.value);
                                        setIsCountryOpen(true);
                                    }}
                                    onFocus={() => setIsCountryOpen(true)}
                                    autoComplete="off"
                                />
                                
                                {/* Flag Icon / Globe */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none flex items-center justify-center w-6">
                                    {selectedCountry ? (
                                        <span className="text-xl leading-none">{selectedCountry.flag}</span>
                                    ) : (
                                        <Globe size={16} />
                                    )}
                                </div>

                                {/* Country Dropdown */}
                                {isCountryOpen && (
                                    <ul className="absolute z-[100] w-full mt-2 border rounded-xl bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-2xl max-h-80 overflow-y-auto no-scrollbar">
                                        {countriesPending ? (
                                            <li className="p-4 text-white/50 text-center">Loading...</li>
                                        ) : filteredCountries.length > 0 ? (
                                            filteredCountries.map((country) => (
                                                <li
                                                    key={country.cca2}
                                                    onClick={() => handleSelectCountry(country)}
                                                    className="p-4 text-white cursor-pointer hover:bg-white/10 transition-colors border-b border-white/5 last:border-none text-left flex items-center gap-3"
                                                >
                                                    <span className="text-xl">{country.flag}</span>
                                                    <span>{country.name.common}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-4 text-white/50 text-center">No country found</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* 3. Toy Select (Custom) */}
                        <div className="space-y-2" ref={toyWrapperRef}>
                            <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                                <Gift size={14} /> Toy
                            </label>
                            
                            <div className="relative w-full">
                                <input type="hidden" name="toyId" value={toyId} />

                                <input
                                    className="w-full appearance-none bg-black/10 hover:bg-black/20 border border-white/10 focus:border-white/40 rounded-xl p-4 text-white outline-none transition-all cursor-pointer placeholder-white/30"
                                    type='text'
                                    placeholder='Search toy...'
                                    value={toyInput}
                                    onChange={(e) => {
                                        setToyInput(e.target.value);
                                        setIsToyOpen(true);
                                    }}
                                    onFocus={() => setIsToyOpen(true)}
                                />

                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                                    <Gift size={16} />
                                </div>

                                {/* Toy Dropdown */}
                                {isToyOpen && toyInput && (
                                    <ul className="absolute z-[100] w-full mt-2 border rounded-xl bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-2xl max-h-80 overflow-y-auto no-scrollbar">
                                        {filteredToys.length > 0 ? (
                                            filteredToys.map((toy) => (
                                                <li
                                                    key={toy.id}
                                                    onClick={() => handleSelectToy(toy.name, toy.id)} 
                                                    className="p-4 text-white cursor-pointer hover:bg-white/10 transition-colors border-b border-white/5 last:border-none text-left"
                                                >
                                                    {toy.name}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-4 text-white/50 text-center">
                                                No toys found!
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 4. Priority Selection */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                            <Signal size={14} /> Priority Level
                        </label>

                        <div className="flex gap-3 p-1 bg-black/10 rounded-xl border border-white/5">
                            {['Low', 'Normal', 'High'].map((level) => {
                                const isLevelSelected = priority === level;
                                return (
                                    <label
                                        key={level}
                                        className={getStyles(level, isLevelSelected)}
                                    >
                                        <input
                                            className="sr-only"
                                            type="radio"
                                            name="priority"
                                            value={level}
                                            checked={isLevelSelected}
                                            onChange={() => setPriority(level)}
                                        />
                                        {level}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full group relative px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold shadow-lg shadow-red-900/30 transition-all active:scale-[0.98] overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Submit Order
                                <SendHorizonal size={20} />
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}