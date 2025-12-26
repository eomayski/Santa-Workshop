import { Package, Truck, Clock, Gift } from 'lucide-react';
import { useToy } from '../../hooks/useToys.js';

export default function Order({
childName,
country,
status,
toyId
}) {
    const { data: toy, error, isPending} = useToy(toyId);

    // --- Helper: Status Styles ---
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 border border-red-400/30 text-red-200">
                        <Clock size={12} /> Pending
                    </span>
                );
            case 'Packed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-400/30 text-amber-200">
                        <Package size={12} /> Packed
                    </span>
                );
            case 'Shipped':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 border border-green-400/30 text-green-200">
                        <Truck size={12} /> Shipped
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <tr className="border-b border-white/5 hover:bg-white/10 transition-colors group"
        >
            {/* Column 1: Child Name & Toy Name Combined */}
            <td className="p-5 pl-8">
                <div>
                    {/* Child Name */}
                    <p className="font-bold text-lg text-white group-hover:text-blue-200 transition-colors mb-1">
                        {childName}
                    </p>

                    {/* Toy Name Subtext */}
                    <div className="flex items-center gap-1.5 text-sm text-blue-100/60 font-medium">
                        <Gift size={14} className="text-blue-300" />
                        {isPending ? 'Toy Loading...' : error ? 'Error on finding toy name' : toy.name}
                    </div>
                </div>
            </td>

            {/* Column 2: Country */}
            <td className="p-5">
                <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                    <span className="text-white/80">{country}</span>
                </div>
            </td>

            {/* Column 3: Status */}
            <td className="p-5 pr-8 text-right">
                {getStatusBadge(status)}
            </td>
        </tr>
    );
}