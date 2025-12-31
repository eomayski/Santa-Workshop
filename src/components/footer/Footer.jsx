import { Snowflake } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-white/30 bg-white/20 backdrop-blur-sm rounded-t-[30px]">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        
        {/* Main Text */}
        <p className="text-white/70 font-medium text-m sm:text-base tracking-wide flex items-center gap-2">
          <Snowflake size={14} className="opacity-50" />
          Sirma Academy React Exam - December 2025
          <Snowflake size={14} className="opacity-50" />
        </p>

      </div>
    </footer>
  );
};

export default Footer;