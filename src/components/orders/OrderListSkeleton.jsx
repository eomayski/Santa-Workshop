const OrderListSkeleton = () => {
    const rows = Array.from({ length: 5 });

    return (
        <div className="overflow-hidden rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/10 border-b border-white/20">
                            <th className="p-5 pl-8">
                                <div className="h-4 w-32 bg-white/20 rounded"></div>
                            </th>
                            <th className="p-5">
                                <div className="h-4 w-20 bg-white/20 rounded"></div>
                            </th>
                            <th className="p-5 text-right pr-8">
                                <div className="h-4 w-16 bg-white/20 rounded ml-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((_, index) => (
                            <tr key={index} className="border-b border-white/5 last:border-none">
                                <td className="p-5 pl-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 shrink-0"></div>
                                        <div className="space-y-2 w-full">
                                            <div className="h-4 w-24 bg-white/20 rounded"></div>
                                            <div className="h-3 w-32 bg-white/10 rounded"></div>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-8 bg-white/20 rounded"></div>
                                        <div className="h-4 w-20 bg-white/10 rounded"></div>
                                    </div>
                                </td>

                                <td className="p-5 text-right pr-8">
                                    <div className="h-9 w-24 bg-white/20 rounded-xl ml-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 flex justify-center gap-4 border-t border-white/10">
                 <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                 <div className="h-8 w-24 bg-white/20 rounded"></div>
                 <div className="h-8 w-8 bg-white/20 rounded-full"></div>
            </div>
        </div>
    );
};

export default OrderListSkeleton