import { Package, Truck, Clock, Gift } from 'lucide-react';
import { useToy } from '../../hooks/useToys.js';

export default function Order({
    childName,
    country,
    status,
    toyId
}) {
    const { data: toy, error, isPending } = useToy(toyId);

    // --- Status Configuration ---
    // Дефинираме цветовете и иконите тук, за да е по-чист JSX кода долу
    const getStatusConfig = (status) => {
        switch (status) {
            case 'Pending':
                return { 
                    style: 'bg-red-500/20 border-red-400/30 text-red-200', 
                    Icon: Clock 
                };
            case 'Packed':
                return { 
                    style: 'bg-amber-500/20 border-amber-400/30 text-amber-200', 
                    Icon: Package 
                };
            case 'Shipped':
                return { 
                    style: 'bg-green-500/20 border-green-400/30 text-green-200', 
                    Icon: Truck 
                };
            default:
                return { 
                    style: 'bg-white/10 text-white', 
                    Icon: Clock 
                };
        }
    };

    const config = getStatusConfig(status);
    const StatusIcon = config.Icon;

    return (
        <tr className="border-b border-white/5 hover:bg-white/10 transition-colors group">
            
            {/* Column 1: Child Name & Toy Name */}
            {/* p-3 на мобилни, p-5 на десктоп */}
            <td className="p-3 sm:p-5 sm:pl-8 align-middle">
                <div>
                    {/* Child Name: по-малък шрифт на мобилни */}
                    <p className="font-bold text-base sm:text-lg text-white group-hover:text-blue-200 transition-colors mb-0.5 sm:mb-1">
                        {childName}
                    </p>

                    {/* Toy Name Subtext */}
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-100/60 font-medium">
                        <Gift size={14} className="text-blue-300 flex-shrink-0" />
                        <span className="truncate max-w-[120px] sm:max-w-xs">
                             {isPending ? 'Loading...' : error ? 'Toy info unavailable' : toy.name}
                        </span>
                    </div>
                </div>
            </td>

            {/* Column 2: Country */}
            <td className="p-3 sm:p-5 align-middle">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium opacity-90">
                    <span className="text-base sm:text-lg">{country.flag}</span>
                    {/* Името на държавата се вижда, но с по-малък шрифт на мобилни */}
                    <span className="text-white/80 leading-tight">
                        {country.name.common}
                    </span>
                </div>
            </td>

            {/* Column 3: Status (Responsive Badge) */}
            <td className="p-3 sm:p-5 sm:pr-8 text-right align-middle">
                <div className={`inline-flex items-center justify-center sm:justify-start gap-1.5 
                    p-2 sm:px-3 sm:py-1 
                    rounded-full border transition-all shadow-sm
                    ${config.style}`}
                >
                    {/* Icon - винаги видима */}
                    <StatusIcon size={14} className="flex-shrink-0" />
                    
                    {/* Text - скрит на мобилни, видим на таблет/десктоп */}
                    <span className="hidden sm:inline text-xs font-bold">
                        {status}
                    </span>
                </div>
            </td>
        </tr>
    );
}