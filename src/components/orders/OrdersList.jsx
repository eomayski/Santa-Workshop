import { useState, useMemo } from 'react';
import { Plus, Package } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders.js';
import Order from './Order.jsx';


const OrdersList = () => {
    const [activeTab, setActiveTab] = useState("All");

    const { data: orders, error, isPending } = useOrders();

    const TABS = ["All", "Pending", "Packed", "Shipped"];

    // --- Filtering Logic ---
    const filteredOrders = useMemo(() => {
        if (!orders || typeof orders !== 'object' || Object.keys(orders).length === 0) return [];

        let data = Object.entries(orders).map(([id, order]) => ({ ...order, id }));

        data = data.map((order) => 
            {switch (order.priority) {
            case "Low":
                order.status = "Pending"
                break;
            case "Normal":
                order.status = "Packed"
                break;
            case "High":
                order.status = "Shipped"
                break;
        }
        return order
    })

    console.log(data);
    

        if (activeTab !== "All") {
            data = data.filter(order => order.status === activeTab);
        }

        return data;
    }, [activeTab]);

    return (
        <div className="w-full max-w-5xl mx-auto p-4 mb-20">

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

            {/* --- Controls Bar: Tabs & Create Button --- */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-[20px] p-2 shadow-lg">

                {/* Left Side: Tabs */}
                <div className="flex p-1 bg-black/20 rounded-xl w-full sm:w-auto overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap flex-1 sm:flex-none
                ${activeTab === tab
                                    ? 'bg-white text-slate-900 shadow-md'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                                }
              cursor-pointer`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right Side: Create Button */}
                <button className="w-full sm:w-auto group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold shadow-lg shadow-red-900/30 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <Plus size={18} className="relative z-10" />
                    <span className="relative z-10">Create Order</span>
                </button>

            </div>

            {/* --- Orders Table --- */}
            <div className="overflow-hidden rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/10 text-blue-100 border-b border-white/20 text-xs font-bold uppercase tracking-wider">
                                <th className="p-5 pl-8">Child & Gift Request</th>
                                <th className="p-5">Country</th>
                                <th className="p-5 text-right pr-8">Status</th>
                            </tr>
                        </thead>

                        <tbody className="text-white">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (<Order key={order.id} {...order}/>))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-12 text-center text-white/50">
                                        <Package size={48} className="mx-auto mb-3 opacity-30" />
                                        <p>No orders found with status "{activeTab}".</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- Table Footer --- */}
                <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-sm text-white/50">
                    <span>Showing {filteredOrders.length} orders</span>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 rounded-lg bg-white/5 opacity-50 cursor-not-allowed">Prev</button>
                        <button className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrdersList;