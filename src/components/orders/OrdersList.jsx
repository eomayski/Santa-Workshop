import { useState, useMemo, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders.js';
import Order from './Order.jsx';
import useTitle from '../../hooks/useTitle.js';
import { Link, useOutletContext, useParams } from 'react-router';
import Pagination from '../pagination/Pagination.jsx';
import OrderListSkeleton from './OrderListSkeleton.jsx';

const OrdersList = () => {
    const params = useParams()
    useTitle('Orders');

    // --- State ---
    const [activeTab, setActiveTab] = useState("All");
    const { data: orders, error, isPending } = useOrders();
    const context = useOutletContext();
    const [page, setPage] = useState(1);
    const limit = 5;

    let elf = {}
    if (context) {
        elf = context.elf
    }

    const TABS = ["All", "Pending", "Packed", "Shipped"];

    useEffect(() => { setPage(1); }, [activeTab]);

    // --- Filtering Logic ---
    const filteredOrders = useMemo(() => {
        if (!orders || typeof orders !== 'object' || Object.keys(orders).length === 0) return [];

        let data = Object.entries(orders).map(([id, order]) => ({ ...order, id }));

        if (Object.keys(elf).length !== 0) {
            if (!elf.tasks) {
                data = []
            } else {
                data = Object.entries(elf.tasks).map(([id, task]) => ({ ...task, id }))
            }
        }

        data = data.map((order) => {
            switch (order.priority) {
                case "Low": order.status = "Pending"; break;
                case "Normal": order.status = "Packed"; break;
                case "High": order.status = "Shipped"; break;
                default: break;
            }
            return order;
        });

        if (activeTab !== "All") {
            data = data.filter(order => order.status === activeTab);
        }

        return data;
    }, [orders, activeTab, elf]);

    // --- Pagination Logic ---
    const handlePageForward = () => { if (page * limit < filteredOrders.length) setPage(prev => prev + 1); }
    const handlePageBackward = () => { setPage(prev => (prev > 1 ? prev - 1 : 1)); }

    const itemsToShow = useMemo(() => {
        const firstItemIndex = (page - 1) * limit;
        const lastItemIndex = firstItemIndex + limit;
        return filteredOrders.length ? filteredOrders.slice(firstItemIndex, lastItemIndex) : [];
    }, [page, limit, filteredOrders]);

    return (
        <div className="w-full flex flex-col flex-grow min-w-0">

            {/* --- CONTROLS SECTION --- */}
            <div className="mb-6 flex flex-col xl:flex-row justify-between items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-[20px] p-2 shadow-lg">

                <div className="grid grid-cols-2 sm:flex p-1 bg-black/20 rounded-xl w-full xl:w-auto gap-1 sm:gap-0">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center
                                ${activeTab === tab
                                    ? 'bg-white text-slate-900 shadow-md'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                                } cursor-pointer`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* CREATE BUTTON */}
                {Object.keys(elf).length === 0 &&
                    <Link to={'/orders/new'} className="w-full sm:w-auto">
                        <button className="w-full group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold shadow-lg shadow-red-900/30 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden cursor-pointer">
                            <Plus size={18} className="relative z-10" />
                            <span className="relative z-10">Create Order</span>
                        </button>
                    </Link>
                }
            </div>

            {isPending && <OrderListSkeleton />}

            {error && <div className="p-4 bg-red-500/20 border border-red-500 text-red-200 rounded-xl">{error.message}</div>}

            {!isPending && !error && (
                <div className="rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden flex flex-col">

                    {/* TABLE WRAPPER */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[350px]">
                            <thead>
                                <tr className="bg-white/10 text-blue-100 border-b border-white/20 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-4 sm:pl-8 w-[40%] sm:w-[50%]">Child & Request</th>

                                    <th className="p-4 w-[30%] sm:w-[25%]">Country</th>

                                    <th className="p-4 text-center sm:text-right sm:pr-8 w-[30%] sm:w-[25%]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {itemsToShow.length > 0 ? (
                                    itemsToShow.map((order) => (<Order key={order.id} {...order} />))
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

                    {/* PAGINATION */}
                    <div className="border-t border-white/10 p-4 bg-white/5">
                        <Pagination
                            total={filteredOrders.length}
                            pageForward={handlePageForward}
                            pageBackward={handlePageBackward}
                            itemsToShow={itemsToShow.length}
                            page={page}
                            limit={limit}
                            itemsName={'orders'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersList;