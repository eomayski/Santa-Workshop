import { Zap } from 'lucide-react';

// --- Mock Data ---
const MOCK_ELVES = [
  { 
    id: 1, 
    name: "Alabaster Snowball", 
    role: "Head of Toy Production", 
    energy: 95, 
    image: "/images/Elves/Alabaster-Snowball.jpg" 
  },
  { 
    id: 2, 
    name: "Bushy Evergreen", 
    role: "Lead Engineer & Inventor", 
    energy: 82, 
    image: "/images/Elves/Bushy-Evergreen.jpg" 
  },
  { 
    id: 3, 
    name: "Pepper Minstix", 
    role: "Security & Naughty List Intel", 
    energy: 35, // Low Energy Example
    image: "/images/Elves/Pepper-Minstix.jpg" 
  },
  { 
    id: 4, 
    name: "Sugarplum Mary", 
    role: "Sweets & Treats Manager", 
    energy: 100, 
    image: "/images/Elves/Sugarplum-Mary.jpg" 
  },
  { 
    id: 5, 
    name: "Wunorse Openslae", 
    role: "Sleigh Maintenance & Logistics", 
    energy: 60, 
    image: "/images/Elves/Wunorse-Openslae.jpg" 
  },
  { 
    id: 6, 
    name: "Buddy (The Human)", 
    role: "Christmas Spirit Quality Control", 
    energy: 25, // Low Energy Example
    image: "/images/Elves/Buddy.jpg" 
  },
];

const ElvesList = () => {

  const getEnergyColorClass = (level) => {
    if (level >= 80) return 'from-green-400 to-green-500 shadow-green-400/50';
    if (level >= 40) return 'from-amber-400 to-amber-500 shadow-amber-400/50';
    return 'from-red-400 to-red-600 shadow-red-400/50';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 mb-20">
      
      {/* Page Title */}
      <div className="relative z-10 mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg mb-3">
          Meet the <span className="text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Elf Team</span>
        </h1>
        <p className="text-white drop-shadow-lg text-lg max-w-2xl mx-auto font-medium">
            The magically tireless crew working behind the scenes to make Christmas happen.
        </p>
      </div>

      {/* --- Grid Container --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {MOCK_ELVES.map((elf) => {
          // Check if energy is low
          const isLowEnergy = elf.energy < 40;

          return (
            <div key={elf.id} className="group relative overflow-hidden rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:border-white/50">
              
              {/* Image Container - CLEAN & SHADOWED */}
              <div className="relative mb-5 w-full max-w-[250px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={elf.image} 
                  alt={elf.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-2xl font-black text-white mb-2 drop-shadow-sm tracking-tight">
                {elf.name}
              </h3>
              <p className="text-blue-100/80 font-bold uppercase tracking-widest text-xs mb-4 px-4 py-1 rounded-full bg-black/20 border border-white/10 inline-block">
                {elf.role}
              </p>

              {/* --- Energy Meter Section --- */}
              <div className="w-full mt-auto bg-black/20 rounded-2xl p-2 border border-white/10 backdrop-blur-sm">
                
                {/* Label and Value */}
                <div className="flex justify-between text-xs mb-1 font-bold px-1">
                  
                  {/* Left Side: Icon + Text */}
                  <span className={`flex items-center gap-1 transition-colors ${isLowEnergy ? 'text-red-300 animate-pulse' : 'text-white/90'}`}>
                    <Zap 
                      size={14} 
                      className={isLowEnergy ? 'text-red-300 fill-red-300' : 'text-yellow-300 fill-yellow-300 drop-shadow-sm'} 
                    /> 
                    Energy
                  </span>

                  {/* Right Side: Percentage */}
                  <span className={`text-sm transition-colors ${isLowEnergy ? 'text-red-300 animate-pulse' : 'text-white'}`}>
                    {elf.energy}%
                  </span>
                </div>
                
                {/* Progress Bar Track */}
                <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden border border-white/5 p-px relative">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out relative overflow-hidden ${getEnergyColorClass(elf.energy)}`}
                    style={{ width: `${elf.energy}%` }}
                  >
                     <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElvesList;   