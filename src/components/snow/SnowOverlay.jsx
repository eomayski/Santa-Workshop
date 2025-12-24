// --- Помощен компонент за снега (Без промяна) ---
const SnowOverlay = () => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.3
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-60 overflow-hidden" aria-hidden="true">
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute bg-white rounded-full blur-[1px]"
                    style={{
                        left: `${flake.left}vw`,
                        top: `-10px`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        opacity: flake.opacity,
                        animation: `snowfall ${flake.duration}s linear infinite`,
                        animationDelay: `-${flake.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default SnowOverlay