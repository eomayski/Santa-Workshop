export default function StatusCard() {
    return (
        <div className="group rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 flex flex-col items-center shadow-lg hover:bg-white/25 transition-all duration-300">
            <div className="p-3 bg-blue-500/90 text-white rounded-2xl mb-3 shadow-inner">
                <Gift size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Toys</h3>
            <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">{isPending ? 'Toys Loading...' : error ? "Error on toys cont" : Object.keys(toys).length}</p>
        </div>
    );
}