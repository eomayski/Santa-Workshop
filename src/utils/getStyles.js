  const getStyles = (level, isSelected) => {
    const baseClasses = "flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 text-white border border-transparent shadow-lg cursor-pointer flex justify-center items-center";

    if (level === 'High') {
      return isSelected 
        ? `${baseClasses} bg-red-600/60 border-white`
        : `${baseClasses} bg-red-600/30 hover:bg-red-600/60`;
    }
    
    if (level === 'Normal') {
      return isSelected 
        ? `${baseClasses} bg-yellow-400/50 border-white`
        : `${baseClasses} bg-yellow-400/30 hover:bg-yellow-400/50`;
    }
    
    return isSelected 
      ? `${baseClasses} bg-green-400/50 border-white`
      : `${baseClasses} bg-green-400/30 hover:bg-green-400/50`;
  };

  export default getStyles