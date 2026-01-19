import { motion } from "framer-motion";
import { Star, Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function BraidingDemo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const services = [
    { name: "Box Braids", price: "$120+", time: "4-6 hrs" },
    { name: "Knotless Braids", price: "$140+", time: "5-7 hrs" },
    { name: "Cornrows", price: "$60+", time: "1-2 hrs" },
    { name: "Twists", price: "$100+", time: "3-5 hrs" },
  ];

  const braiddingImages = [
    { src: "/images/braidinghairmock.jpg", alt: "Beautiful Braiding Work" },
    { src: "/images/braidinghairmock1.jpg", alt: "Professional Styling" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % braiddingImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + braiddingImages.length) % braiddingImages.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center"
    >
      {/* iPhone Frame */}
      <div className="relative drop-shadow-2xl" style={{ width: "320px", height: "620px" }}>
        {/* Phone Bezel */}
        <div className="absolute inset-0 bg-black rounded-[50px] shadow-2xl" style={{ padding: "14px" }}>
          {/* Phone Screen */}
          <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col border border-gray-200">
            {/* Dynamic Island Notch */}
            <div className="h-8 bg-black rounded-b-3xl mx-auto w-48 flex items-center justify-center">
              <div className="w-12 h-6 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Phone Content */}
            <div className="flex-1 overflow-hidden flex flex-col bg-white">
              {/* Logo Bar */}
              <div className="bg-white px-4 py-2 flex items-center justify-center border-b border-gray-100">
                <img src="/images/braidinghairmocklogo.png" alt="Sonoaac" className="h-6 w-auto" />
              </div>
              
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-600 text-white px-5 py-4 flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="text-xl font-serif font-bold italic">Luxe Braids</h3>
                  <p className="text-purple-100 text-xs uppercase tracking-widest mt-0.5">Premium Studio</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white text-purple-900 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-purple-100 transition-all shadow-md"
                >
                  Book
                </motion.button>
              </div>

              {/* Hero Image Carousel */}
              <div className="relative h-40 bg-gradient-to-br from-purple-100 to-pink-50 overflow-hidden flex-shrink-0">
                <motion.img 
                  key={currentImageIndex}
                  src={braiddingImages[currentImageIndex].src} 
                  alt={braiddingImages[currentImageIndex].alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/40 to-transparent flex items-end justify-between p-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={prevImage}
                    className="bg-white/90 hover:bg-white text-purple-900 p-2 rounded-full transition-all shadow-lg backdrop-blur-sm"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>
                  <div className="text-white flex flex-col items-center">
                    <div className="flex items-center gap-1 text-yellow-300 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <p className="font-semibold text-xs">"Best in town!"</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={nextImage}
                    className="bg-white/90 hover:bg-white text-purple-900 p-2 rounded-full transition-all shadow-lg backdrop-blur-sm"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Services List */}
              <div className="p-4 overflow-y-auto flex-1">
                <div className="flex items-center gap-2 text-purple-900 mb-4 font-bold text-sm">
                  <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar size={14} className="text-purple-700" />
                  </div>
                  <span>Services</span>
                </div>
                
                <div className="space-y-2">
                  {services.map((s) => (
                    <motion.div 
                      key={s.name}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer text-xs shadow-sm"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">{s.name}</div>
                        <div className="flex items-center gap-1 text-gray-500 mt-1">
                          <Clock size={10} /> {s.time}
                        </div>
                      </div>
                      <div className="text-purple-700 font-bold text-sm">
                        {s.price}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={12} className="flex-shrink-0" />
                <span>Downtown Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
