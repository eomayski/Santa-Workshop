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
        <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-sm text-white/50">
            <span>Showing {itemsToShow} out of {total} {itemsName}</span>
            <div className="flex gap-2">
                {page === 1 ? 
                <button disabled className='px-3 py-1 rounded-lg bg-white/5 opacity-50 cursor-not-allowed'>Prev</button> :
                <button 
                onClick={pageBackward}
                className='px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20' >Prev</button>}


                {page * limit >= total ? 
                <button disabled className='px-3 py-1 rounded-lg bg-white/5 opacity-50 cursor-not-allowed'>Next</button> :
                <button
                onClick={pageForward}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">Next</button>}
            </div>
        </div>
    );
}