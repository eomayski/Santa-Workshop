import { Gift, Globe, SendHorizonal, Signal, User } from "lucide-react";

export default function OrderCreate() {
    return (
  <div className="w-full max-w-2xl mx-auto">
    
    {/* --- Glass Container --- */}
    <div className="relative text-center  overflow-hidden rounded-[40px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-8 sm:p-10">
      
      {/* Header */}
      <div className="mb-8">
          <h2 className="text-3xl font-black text-white drop-shadow-md">Create Order</h2>
          <p className="text-blue-100 text-sm mt-1">Send a new request to the workshop.</p>
      </div>

      {/* --- Form --- */}
      <form className="space-y-6">
          
          {/* 1. Child Name Input */}
          <div className="space-y-2">
              <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                  <User size={14} /> Child's Name
              </label>
              <div className="relative">
                  <input 
                      type="text"
                      name="childName"
                      placeholder="e.g. Timmy Turner"
                      className="w-full bg-black/10 hover:bg-black/20 focus:bg-black/20 border border-white/10 focus:border-white/40 rounded-xl p-4 text-white placeholder-white/30 outline-none transition-all"
                  />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 2. Country Select */}
              <div className="space-y-2">
                  <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                      <Globe size={14} /> Country
                  </label>
                  <div className="relative">
                      <select
                          name="country"
                          className="w-full appearance-none bg-black/10 hover:bg-black/20 border border-white/10 focus:border-white/40 rounded-xl p-4 text-white outline-none transition-all cursor-pointer"
                      >
                          <option value="" className="bg-slate-800 text-white/50">Select Country...</option>
                          {/* Map your countries here */}
                          <option value="Bulgaria" className="bg-slate-800">Bulgaria</option>
                          <option value="UK" className="bg-slate-800">UK</option>
                          <option value="USA" className="bg-slate-800">USA</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                          <Globe size={16} />
                      </div>
                  </div>
              </div>

              {/* 3. Toy Select */}
              <div className="space-y-2">
                  <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                      <Gift size={14} /> Toy
                  </label>
                  <div className="relative">
                      <select
                          name="toyId"
                          className="w-full appearance-none bg-black/10 hover:bg-black/20 border border-white/10 focus:border-white/40 rounded-xl p-4 text-white outline-none transition-all cursor-pointer"
                      >
                          <option value="" className="bg-slate-800 text-white/50">Select Toy...</option>
                          {/* Map your toys here */}
                          <option value="1" className="bg-slate-800">Wooden Train</option>
                          <option value="2" className="bg-slate-800">Doll</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                          <Gift size={16} />
                      </div>
                  </div>
              </div>
          </div>

          {/* 4. Priority Selection (Visual Buttons) */}
          <div className="space-y-2">
              <label className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider">
                  <Signal size={14} /> Priority Level
              </label>
              <div className="flex gap-3 p-1 bg-black/10 rounded-xl border border-white/5">
                  {['Low', 'Normal', 'High'].map((level) => (
                      <button
                          key={level}
                          type="button"
                          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                            level === 'High' ? 'bg-red-600/30 text-white shadow-lg hover:bg-red-600/60' 
                                : level === 'Normal' ? 'bg-yellow-400/30 text-white shadow-lg hover:bg-yellow-400/50'
                                : 'bg-green-400/30 text-white shadow-lg hover:bg-green-400/50'
                          } cursor-pointer`}
                      >
                          {level}
                      </button>
                  ))}
              </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
              <button 
                  type="submit"
                  className="w-full group relative px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-bold shadow-lg shadow-red-900/30 transition-all active:scale-[0.98] overflow-hidden cursor-pointer"
              >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                      Submit Order
                      <SendHorizonal size={20} />
                  </span>
              </button>
          </div>

      </form>
    </div>
  </div>
);
}