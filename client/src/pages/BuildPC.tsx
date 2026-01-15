import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Cpu, HardDrive, Monitor, Box, Zap, ChevronRight, ShoppingCart, Loader2 } from "lucide-react";
import { usePcParts } from "@/hooks/use-pc-parts";
import { type PcPart } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "CPU", icon: Cpu, label: "Processor" },
  { id: "Motherboard", icon: Box, label: "Motherboard" }, // Using Box as placeholder
  { id: "GPU", icon: Monitor, label: "Graphics Card" },
  { id: "RAM", icon: HardDrive, label: "Memory" },
  { id: "Storage", icon: HardDrive, label: "Storage" },
  { id: "Case", icon: Box, label: "Case" },
  { id: "PSU", icon: Zap, label: "Power Supply" },
];

export default function BuildPC() {
  const { data: parts, isLoading } = usePcParts();
  const [selections, setSelections] = useState<Record<string, PcPart>>({});
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const { toast } = useToast();

  const activeCategory = categories[activeCategoryIndex];
  
  // Filter parts for current category
  const currentParts = useMemo(() => {
    if (!parts) return [];
    return parts.filter(p => p.category === activeCategory.id);
  }, [parts, activeCategory.id]);

  const totalPrice = useMemo(() => {
    const rawTotal = Object.values(selections).reduce((sum, part) => sum + part.price, 0);
    return Math.round(rawTotal * 1.15); // 15% markup
  }, [selections]);

  const handleSelect = (part: PcPart) => {
    setSelections(prev => ({ ...prev, [part.category]: part }));
    
    // Auto advance after short delay if not last step
    if (activeCategoryIndex < categories.length - 1) {
      setTimeout(() => {
        setActiveCategoryIndex(prev => prev + 1);
      }, 400);
    }
  };

  const handleCheckout = () => {
    if (Object.keys(selections).length < categories.length) {
      toast({
        title: "Incomplete Build",
        description: "Please select all parts before checkout.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Build Saved!",
      description: "Redirecting to checkout... (Demo only)",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Builder Interface */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Stepper Header */}
              <div className="p-6 border-b border-gray-100 overflow-x-auto">
                <div className="flex items-center gap-4 min-w-max">
                  {categories.map((cat, idx) => {
                    const isCompleted = !!selections[cat.id];
                    const isActive = idx === activeCategoryIndex;
                    
                    return (
                      <div 
                        key={cat.id}
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all
                          ${isActive ? "bg-pink-50 text-pink-600 ring-2 ring-pink-500 ring-offset-2" : ""}
                          ${isCompleted && !isActive ? "bg-green-50 text-green-600" : ""}
                          ${!isActive && !isCompleted ? "text-gray-400 hover:text-gray-600" : ""}
                        `}
                      >
                        <cat.icon size={18} />
                        <span className="font-medium text-sm whitespace-nowrap">{cat.label}</span>
                        {isCompleted && <Check size={14} />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parts Selection Area */}
              <div className="p-8 min-h-[500px]">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Select {activeCategory.label}</h2>
                  <p className="text-gray-500">Choose the best component for your build.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentParts.length > 0 ? (
                    currentParts.map((part) => (
                      <motion.div
                        key={part.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(part)}
                        className={`
                          relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 items-start
                          ${selections[activeCategory.id]?.id === part.id 
                            ? "border-pink-500 bg-pink-50/50" 
                            : "border-gray-100 hover:border-pink-200 bg-white"}
                        `}
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {part.imageUrl ? (
                            <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover" />
                          ) : (
                            <activeCategory.icon className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{part.name}</h3>
                          <div className="text-sm text-gray-500 mb-2">{part.specs}</div>
                          <div className="font-bold text-pink-600">${part.price}</div>
                        </div>
                        {selections[activeCategory.id]?.id === part.id && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                      No parts available in this category yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingCart className="text-pink-500" />
                Build Summary
              </h3>

              <div className="space-y-4 mb-8">
                {categories.map((cat) => {
                  const selectedPart = selections[cat.id];
                  return (
                    <div key={cat.id} className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">{cat.label}</span>
                      {selectedPart ? (
                        <span className="font-medium text-gray-900 text-right max-w-[150px] truncate">
                          {selectedPart.name}
                        </span>
                      ) : (
                        <span className="text-gray-300 italic">Not selected</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-gray-500 font-medium">Total Estimate</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.2, color: "#ec4899" }}
                    animate={{ scale: 1, color: "#111827" }}
                    className="text-3xl font-black"
                  >
                    ${totalPrice}
                  </motion.span>
                </div>
                <p className="text-xs text-gray-400 text-right">Includes assembly & testing fee</p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-green-500 hover:shadow-xl hover:shadow-pink-500/20 transition-all active:scale-95"
              >
                Checkout Build
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
