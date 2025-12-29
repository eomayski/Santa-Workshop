import { useEffect, useState } from "react";
import { useOrders } from "../../hooks/useOrders.js";
import { useToys } from "../../hooks/useToys.js";
import { useElves } from "../../hooks/useElves.js";
import { Gift, Package, Users } from "lucide-react";

export default function StatusCard({ card }) {
    const { data: toys, error: toysError, isPending: toysPending } = useToys();
    const { data: orders, error: ordersError, isPending: ordersPending } = useOrders();
    const { data: elves, error: elvesError, isPending: elvesPending } = useElves();

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);

    useEffect(() => {
        switch (card) {
            case "toys":
                if (toys) {
                    setData([...Object.keys(toys)])
                    setError(toysError)
                    setIsPending(toysPending)
                }
                break;
            case "orders":
                if (orders) {
                    setData([...Object.keys(orders)])
                    setError(ordersError)
                    setIsPending(ordersPending)
                }
                break;
            case "elves":
                if (elves) {
                    setData([...Object.keys(elves)])
                    setError(elvesError)
                    setIsPending(elvesPending)
                }
                break;
        }
    }, [card, toys, toysError, toysPending, orders, ordersError, ordersPending, elves, elvesError, elvesPending])

    return (

        <div className="group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 flex flex-col items-center shadow-lg hover:bg-white/25 transition-all duration-300">

            {card === "toys" ?
                <>
                    <div className="p-3 bg-blue-500/90 text-white rounded-2xl mb-3 shadow-inner">
                        <Gift size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Toys</h3>
                </>
                :
                card === "orders" ?
                <>
                    <div className="p-3 bg-orange-500/90 text-white rounded-2xl mb-3 shadow-inner">
                        <Package size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-1">Pending Orders</h3>
                </>
                :
                <>
                    <div className="p-3 bg-green-500/90 text-white rounded-2xl mb-3 shadow-inner">
                        <Users size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-green-100 text-xs font-bold uppercase tracking-widest mb-1">Active Elves</h3>
                </>}

            <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">{isPending ? 'Loading...' : error ? "Error!" : data.length}</p>
        </div>
    );
}