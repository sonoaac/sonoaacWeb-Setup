import { motion } from "framer-motion";
import braidingBg from "@assets/braidinghair1.jpg";
import { Star, Calendar, Clock, MapPin } from "lucide-react";

export function BraidingDemo() {
  const services = [
    { name: "Box Braids", price: "$120+", time: "4-6 hrs" },
    { name: "Knotless Braids", price: "$140+", time: "5-7 hrs" },
    { name: "Cornrows", price: "$60+", time: "1-2 hrs" },
    { name: "Twists", price: "$100+", time: "3-5 hrs" },
  ];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-100 font-sans">
      {/* Header */}
      <div className="bg-purple-900 text-white p-6 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-serif italic">Luxe Braids</h3>
          <p className="text-purple-200 text-xs uppercase tracking-widest mt-1">Premium Styling Studio</p>
        </div>
        <button className="bg-white text-purple-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-purple-100 transition-colors">
          Book Appt
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {braidingBg ? (
          <img src={braidingBg} alt="Styles" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-300">
            <Star size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-6">
          <div className="text-white">
            <div className="flex items-center gap-1 text-yellow-400 mb-1">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
            <p className="font-medium text-sm">"Best braider in the city!"</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-purple-900 mb-4 font-bold">
          <Calendar size={18} />
          <span>Select Service</span>
        </div>
        
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-3 rounded-lg border border-purple-50 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer group">
              <div>
                <div className="font-medium text-gray-800">{s.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock size={12} /> {s.time}
                </div>
              </div>
              <div className="text-purple-700 font-bold group-hover:scale-105 transition-transform">
                {s.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 border-t pt-4 border-gray-100">
          <MapPin size={14} />
          123 Beauty Lane, Downtown District
        </div>
      </div>
    </div>
  );
}
