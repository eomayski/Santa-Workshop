const ElvesListSkeleton = () => {
    const cards = Array.from({ length: 6 });

    return (
        <div className="w-full max-w-6xl mx-auto p-4 mb-20 animate-pulse">
            
            {/* --- Title Section Skeleton --- */}
            <div className="mb-10 text-center flex flex-col items-center">
                {/* Main Title Placeholder */}
                <div className="h-10 sm:h-12 w-64 sm:w-96 bg-white/20 rounded-xl mb-4"></div>
                {/* Subtitle Placeholder */}
                <div className="h-5 w-48 sm:w-[500px] bg-white/10 rounded-lg"></div>
            </div>

            {/* --- Grid Container Skeleton --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cards.map((_, index) => (
                    <div 
                        key={index} 
                        className="rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/30 p-6 flex flex-col items-center"
                    >
                        {/* Image Placeholder (Square & Rounded) */}
                        <div className="mb-5 w-full max-w-[250px] aspect-square rounded-[2rem] bg-white/20 shadow-inner"></div>

                        {/* Name Placeholder */}
                        <div className="h-8 w-32 bg-white/20 rounded mb-2"></div>
                        
                        {/* Role Placeholder (Pill) */}
                        <div className="h-6 w-24 bg-white/10 rounded-full mb-4 border border-white/5"></div>

                        {/* Energy Meter Placeholder */}
                        <div className="w-full mt-auto bg-black/10 rounded-2xl p-2 border border-white/5">
                            {/* Label Row */}
                            <div className="flex justify-between mb-1 px-1">
                                <div className="h-3 w-12 bg-white/20 rounded"></div>
                                <div className="h-3 w-8 bg-white/20 rounded"></div>
                            </div>
                            {/* Progress Bar Track */}
                            <div className="h-2.5 w-full bg-black/20 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElvesListSkeleton