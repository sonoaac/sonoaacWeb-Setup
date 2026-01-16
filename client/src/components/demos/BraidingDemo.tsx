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
    { src: "/braidinghair1.jpg", alt: "Beautiful Braiding Work" },
    { src: "/braidinghair1.jpg", alt: "Professional Styling" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % braiddingImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + braiddingImages.length) % braiddingImages.length);
  };

  return (
    <div className="flex items-center justify-center">
      {/* iPhone Frame */}
      <div className="relative" style={{ width: "280px", height: "580px" }}>
        {/* Phone Bezel */}
        <div className="absolute inset-0 bg-black rounded-[40px] shadow-2xl" style={{ padding: "12px" }}>
          {/* Phone Screen */}
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="h-6 bg-black rounded-b-2xl mx-auto w-1/2" />
            
            {/* Phone Content - scrollable area */}
            <div className="flex-1 overflow-hidden flex flex-col bg-white">
              {/* Header */}
              <div className="bg-purple-900 text-white px-4 py-3 flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="text-lg font-serif italic">Luxe Braids</h3>
                  <p className="text-purple-200 text-xs uppercase tracking-widest mt-0.5">Premium Studio</p>
                </div>
                <button className="bg-white text-purple-900 px-2 py-1 rounded-full text-xs font-bold hover:bg-purple-100 transition-colors">
                  Book
                </button>
              </div>

              {/* Hero Image Carousel */}
              <div className="relative h-32 bg-gray-200 overflow-hidden flex-shrink-0">
                <motion.img 
                  key={currentImageIndex}
                  src={braiddingImages[currentImageIndex].src} 
                  alt={braiddingImages[currentImageIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end justify-between p-2">
                  <button
                    onClick={prevImage}
                    className="bg-white/80 hover:bg-white text-purple-900 p-1 rounded-full transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <div className="text-white flex flex-col items-center">
                    <div className="flex items-center gap-0.5 text-yellow-400 mb-0.5">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </div>
                    <p className="font-medium text-xs">"Best braider!"</p>
                  </div>
                  <button
                    onClick={nextImage}
                    className="bg-white/80 hover:bg-white text-purple-900 p-1 rounded-full transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Services List */}
              <div className="p-4 overflow-y-auto flex-1">
                <div className="flex items-center gap-2 text-purple-900 mb-3 font-bold text-sm">
                  <Calendar size={16} />
                  <span>Select Service</span>
                </div>
                
                <div className="space-y-2">
                  {services.map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-2 rounded-lg border border-purple-50 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer text-xs">
                      <div>
                        <div className="font-medium text-gray-800">{s.name}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <Clock size={10} /> {s.time}
                        </div>
                      </div>
                      <div className="text-purple-700 font-bold">
                        {s.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 border-t pt-4 border-gray-100">
          <MapPin size={14} />
          123 Beauty Lane, Downtown District
        </div>
      </div>
    </div>
  );
}
