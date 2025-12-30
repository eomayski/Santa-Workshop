const ToysListSkeleton = () => {
    // 5 реда за имитация на таблицата
    const rows = Array.from({ length: 5 });

    return (
        <div className="animate-pulse w-full">
            
            {/* --- Filter Bar Skeleton --- */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-lg">
                {/* Title Placeholder */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                    <div className="h-6 w-32 bg-white/20 rounded"></div>
                </div>

                {/* Filters Placeholder */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Select Box */}
                    <div className="h-10 w-full sm:w-48 bg-white/20 rounded-xl"></div>
                    {/* Checkbox + Text */}
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-white/20"></div>
                        <div className="h-4 w-24 bg-white/20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* --- Table Container Skeleton --- */}
            <div className="overflow-hidden rounded-[30px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Header */}
                        <thead>
                            <tr className="bg-white/10 border-b border-white/20">
                                <th className="p-5"><div className="h-4 w-24 bg-white/20 rounded"></div></th>
                                <th className="p-5"><div className="h-4 w-20 bg-white/20 rounded"></div></th>
                                <th className="p-5"><div className="h-4 w-24 bg-white/20 rounded"></div></th>
                                <th className="p-5 text-center"><div className="h-4 w-12 bg-white/20 rounded mx-auto"></div></th>
                                <th className="p-5 text-right"><div className="h-4 w-16 bg-white/20 rounded ml-auto"></div></th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {rows.map((_, index) => (
                                <tr key={index} className="border-b border-white/5 last:border-none">
                                    {/* Name */}
                                    <td className="p-5">
                                        <div className="h-5 w-40 bg-white/20 rounded"></div>
                                    </td>
                                    {/* Category Pill */}
                                    <td className="p-5">
                                        <div className="h-6 w-20 bg-white/10 rounded-full border border-white/5"></div>
                                    </td>
                                    {/* Difficulty Pill */}
                                    <td className="p-5">
                                        <div className="h-6 w-24 bg-white/10 rounded-full border border-white/5 flex items-center px-2 gap-2">
                                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                            <div className="w-12 h-2 bg-white/10 rounded"></div>
                                        </div>
                                    </td>
                                    {/* Status Icon (Center) */}
                                    <td className="p-5">
                                        <div className="w-8 h-8 rounded-full bg-white/20 mx-auto"></div>
                                    </td>
                                    {/* Action Button (Right) */}
                                    <td className="p-5">
                                        <div className="h-9 w-24 bg-white/20 rounded-xl ml-auto border border-white/10"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Skeleton */}
                <div className="p-4 flex justify-center gap-4 border-t border-white/10">
                     <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                     <div className="h-8 w-24 bg-white/20 rounded"></div>
                     <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ToysListSkeleton