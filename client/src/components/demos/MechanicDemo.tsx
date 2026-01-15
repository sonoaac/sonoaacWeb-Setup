import { motion } from "framer-motion";
import mechanicBg from "@assets/autoservicing.jpg";
import { Wrench, Gauge, ShieldCheck, Phone } from "lucide-react";

export function MechanicDemo() {
  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 text-slate-100 font-mono">
      {/* Navigation */}
      <div className="flex items-center justify-between p-5 border-b border-slate-800">
        <div className="flex items-center gap-2 text-red-500 font-bold text-lg tracking-tighter">
          <Wrench className="w-6 h-6" />
          AUTO<span className="text-white">FIX</span>
        </div>
        <div className="flex gap-4 text-xs font-bold text-slate-400">
          <span className="hover:text-red-500 cursor-pointer">SERVICES</span>
          <span className="hover:text-red-500 cursor-pointer">ABOUT</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-40 overflow-hidden">
        {mechanicBg ? (
          <img src={mechanicBg} alt="Mechanic" className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
            <Gauge size={48} className="text-slate-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent flex items-center p-6">
          <div>
            <h2 className="text-2xl font-black italic mb-2">FULL SERVICE<br /><span className="text-red-600">REPAIR SHOP</span></h2>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-xs font-bold uppercase rounded-sm skew-x-[-10deg]">
              <span className="skew-x-[10deg] block">Get Estimate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-6 grid grid-cols-2 gap-3">
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
  );
}
