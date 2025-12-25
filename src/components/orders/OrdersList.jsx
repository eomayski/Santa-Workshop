import { useState, useMemo } from 'react';
import { Plus, Package, Truck, Clock, Gift } from 'lucide-react';

// Mock Data
const MOCK_ORDERS = [
  { id: "ORD-701", childName: "Alice Wonderland", toyName: "Wooden Train Set", country: "UK", countryCode: "🇬🇧", status: "Pending" },
  { id: "ORD-702", childName: "Roberto Benigni", toyName: "Pinocchio Puppet", country: "Italy", countryCode: "🇮🇹", status: "Packed" },
  { id: "ORD-703", childName: "Sakura Kinomoto", toyName: "Magical Staff", country: "Japan", countryCode: "🇯🇵", status: "Shipped" },
  { id: "ORD-704", childName: "Hansel Grete", toyName: "Gingerbread House Kit", country: "Germany", countryCode: "🇩🇪", status: "Pending" },
  { id: "ORD-705", childName: "Vaiana Motunui", toyName: "Model Canoe", country: "Polynesia", countryCode: "🏝️", status: "Shipped" },
  { id: "ORD-706", childName: "Kevin McCallister", toyName: "BB Gun Red Ryder", country: "USA", countryCode: "🇺🇸", status: "Packed" },
  { id: "ORD-707", childName: "Pippi Longstocking", toyName: "Gold Coin Chest", country: "Sweden", countryCode: "🇸🇪", status: "Shipped" },
];

const TABS = ["All", "Pending", "Packed", "Shipped"];

const OrdersList = () => {
  const [activeTab, setActiveTab] = useState("All");

  // --- Filtering Logic ---
  const filteredOrders = useMemo(() => {
    let data = MOCK_ORDERS;

    if (activeTab !== "All") {
      data = data.filter(order => order.status === activeTab);
    }

    return data;
  }, [activeTab]);

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
    <div className="w-full max-w-5xl mx-auto p-4 mb-20">
      
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
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Side: Create Button */}
        <button className="w-full sm:w-auto group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-bold shadow-lg shadow-red-900/30 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden">
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
                filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-b border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    {/* Column 1: Child Name & Toy Name Combined */}
                    <td className="p-5 pl-8">
                      <div>
                        {/* Child Name */}
                        <p className="font-bold text-lg text-white group-hover:text-blue-200 transition-colors mb-1">
                          {order.childName}
                        </p>
                        
                        {/* Toy Name Subtext */}
                        <div className="flex items-center gap-1.5 text-sm text-blue-100/60 font-medium">
                          <Gift size={14} className="text-blue-300" /> 
                          {order.toyName}
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Country */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                        <span className="text-2xl filter drop-shadow-sm">{order.countryCode}</span>
                        <span className="text-white/80">{order.country}</span>
                      </div>
                    </td>

                    {/* Column 3: Status */}
                    <td className="p-5 pr-8 text-right">
                      {getStatusBadge(order.status)}
                    </td>
                  </tr>
                ))
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