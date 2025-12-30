export default function Pagination({
    total,
    pageForward,
    pageBackward,
    itemsToShow,
    page,
    limit,
    itemsName
}) {
    return (
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-sm text-white/50">
            
            <span className="text-center sm:text-left">
                Showing {itemsToShow} out of {total} {itemsName}
            </span>
            
            <div className="flex gap-2">
                {page === 1 ? (
                    <button disabled className='px-4 py-1.5 rounded-xl bg-white/5 opacity-40 cursor-not-allowed border border-white/5 text-xs font-medium uppercase tracking-wide transition-all'>
                        Prev
                    </button>
                ) : (
                    <button 
                        onClick={pageBackward}
                        className='px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 cursor-pointer transition-all active:scale-95 text-xs font-bold uppercase tracking-wide shadow-sm' 
                    >
                        Prev
                    </button>
                )}


                {page * limit >= total ? (
                    <button disabled className='px-4 py-1.5 rounded-xl bg-white/5 opacity-40 cursor-not-allowed border border-white/5 text-xs font-medium uppercase tracking-wide transition-all'>
                        Next
                    </button>
                ) : (
                    <button
                        onClick={pageForward}
                        className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 cursor-pointer transition-all active:scale-95 text-xs font-bold uppercase tracking-wide shadow-sm"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}