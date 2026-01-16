import { motion } from "framer-motion";
import { Wrench, Gauge, ShieldCheck, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function MechanicDemo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const autoImages = [
    { src: "/autoservicing.jpg", alt: "Auto Service Center" },
    { src: "/autoservicing.jpg", alt: "Professional Mechanics" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % autoImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + autoImages.length) % autoImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex items-center justify-center"
    >
      {/* iPad Frame */}
      <div className="relative drop-shadow-2xl" style={{ width: "500px", height: "620px" }}>
        {/* Tablet Bezel */}
        <div className="absolute inset-0 bg-slate-800 rounded-[40px] shadow-2xl" style={{ padding: "16px" }}>
          {/* Tablet Screen */}
          <div className="w-full h-full bg-gradient-to-br from-slate-950 to-slate-900 rounded-[32px] overflow-hidden flex flex-col border border-gray-700">
            {/* Navigation */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-700 flex-shrink-0 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-white font-bold">
                  <Wrench size={20} />
                </div>
                <div>
                  <h2 className="text-red-500 font-black tracking-tighter text-lg">AUTO<span className="text-white">FIX</span></h2>
                  <p className="text-slate-400 text-xs">Professional Service</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-400">
                <motion.span className="hover:text-red-500 cursor-pointer transition-colors">SERVICES</motion.span>
                <motion.span className="hover:text-red-500 cursor-pointer transition-colors">ABOUT</motion.span>
              </div>
            </div>

            {/* Hero Image Carousel */}
            <div className="relative h-56 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden flex-shrink-0">
              <motion.img 
                key={currentImageIndex}
                src={autoImages[currentImageIndex].src}
                alt={autoImages[currentImageIndex].alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover opacity-75" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent flex items-center justify-between px-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={prevImage}
                  className="bg-red-600/90 hover:bg-red-600 text-white p-3 rounded-full transition-all shadow-lg backdrop-blur-sm"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                
                <div className="text-white text-center">
                  <motion.h2 
                    className="text-2xl font-black italic mb-3 drop-shadow-lg"
                  >
                    FULL SERVICE<br /><span className="text-red-500">REPAIR</span>
                  </motion.h2>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 text-xs font-bold uppercase rounded-lg skew-x-[-10deg] transition-all shadow-lg"
                  >
                    <span className="skew-x-[10deg] block">Get Estimate</span>
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={nextImage}
                  className="bg-red-600/90 hover:bg-red-600 text-white p-3 rounded-full transition-all shadow-lg backdrop-blur-sm"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="p-6 grid grid-cols-2 gap-4 flex-1 overflow-y-auto">
              {[
                { icon: Gauge, label: "Diagnostics", color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/5" },
                { icon: Wrench, label: "Repairs", color: "text-red-400", bg: "from-red-500/10 to-red-600/5" },
                { icon: ShieldCheck, label: "Inspection", color: "text-green-400", bg: "from-green-500/10 to-green-600/5" },
                { icon: Phone, label: "Emergency", color: "text-yellow-400", bg: "from-yellow-500/10 to-yellow-600/5" }
              ].map((item) => (
                <motion.div 
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className={`bg-gradient-to-br ${item.bg} p-5 rounded-xl border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition-all cursor-pointer flex flex-col items-center gap-3 text-center shadow-md`}
                >
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                  <span className="text-xs font-bold tracking-wide text-slate-200">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
