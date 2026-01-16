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
    <div className="flex items-center justify-center">
      {/* iPad Frame */}
      <div className="relative" style={{ width: "450px", height: "580px" }}>
        {/* Tablet Bezel */}
        <div className="absolute inset-0 bg-gray-800 rounded-[30px] shadow-2xl" style={{ padding: "10px" }}>
          {/* Tablet Screen */}
          <div className="w-full h-full bg-slate-900 rounded-[24px] overflow-hidden flex flex-col">
            {/* Navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2 text-red-500 font-bold text-base tracking-tighter">
                <Wrench className="w-5 h-5" />
                AUTO<span className="text-white">FIX</span>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-400">
                <span className="hover:text-red-500 cursor-pointer">SERVICES</span>
                <span className="hover:text-red-500 cursor-pointer">ABOUT</span>
              </div>
            </div>

            {/* Hero Image Carousel */}
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <motion.img 
                key={currentImageIndex}
                src={autoImages[currentImageIndex].src}
                alt={autoImages[currentImageIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover opacity-70" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent flex items-center justify-between px-3">
                <button
                  onClick={prevImage}
                  className="bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <div>
                  <h2 className="text-xl font-black italic mb-2">FULL SERVICE<br /><span className="text-red-600">REPAIR SHOP</span></h2>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-bold uppercase rounded-sm skew-x-[-10deg]">
                    <span className="skew-x-[10deg] block">Get Estimate</span>
                  </button>
                </div>
                <button
                  onClick={nextImage}
                  className="bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Services Grid */}
            <div className="p-6 grid grid-cols-2 gap-4 flex-1 overflow-y-auto">
              {[
                { icon: Gauge, label: "Diagnostics", color: "text-blue-400" },
                { icon: Wrench, label: "Repairs", color: "text-red-400" },
                { icon: ShieldCheck, label: "Inspection", color: "text-green-400" },
                { icon: Phone, label: "Emergency", color: "text-yellow-400" }
              ].map((item) => (
                <div key={item.label} className="bg-slate-800/50 p-4 rounded-lg border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer flex flex-col items-center gap-2 text-center">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                  <span className="text-xs font-bold tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
