import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePcParts } from "@/hooks/use-pc-parts";
import { type PcPart } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "CPU", label: "Processor" },
  { id: "Motherboard", label: "Motherboard" },
  { id: "GPU", label: "Graphics Card" },
  { id: "RAM", label: "Memory" },
  { id: "Storage", label: "Storage" },
  { id: "Case", label: "Case" },
  { id: "PSU", label: "Power Supply" },
];

export default function BuildPC() {
  const { data: parts, isLoading } = usePcParts();
  const [selections, setSelections] = useState<Record<string, PcPart>>({});
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const { toast } = useToast();

  const activeCategory = categories[activeCategoryIndex];

  const currentParts = useMemo(() => {
    if (!parts) return [];
    return parts.filter((p) => p.category === activeCategory.id);
  }, [parts, activeCategory.id]);

  const totalPrice = useMemo(() => {
    const raw = Object.values(selections).reduce((sum, p) => sum + p.price, 0);
    return Math.round(raw * 1.15);
  }, [selections]);

  const handleSelect = (part: PcPart) => {
    setSelections((prev) => ({ ...prev, [part.category]: part }));
    if (activeCategoryIndex < categories.length - 1) {
      setTimeout(() => setActiveCategoryIndex((prev) => prev + 1), 400);
    }
  };

  const handleCheckout = () => {
    if (Object.keys(selections).length < categories.length) {
      toast({ title: "Incomplete Build", description: "Please select all components.", variant: "destructive" });
      return;
    }
    toast({ title: "Build Saved", description: "We'll be in touch to confirm your build." });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.3em] text-green-700 animate-pulse">
          Loading components...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.4em] text-green-800 block mb-4">
            — Build PC
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-green-100">
            Custom PC Builder
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Builder */}
          <div className="flex-1">
            {/* Category stepper */}
            <div className="overflow-x-auto mb-6">
              <div className="flex gap-1 min-w-max border-b border-green-900/30 pb-4">
                {categories.map((cat, idx) => {
                  const isCompleted = !!selections[cat.id];
                  const isActive = idx === activeCategoryIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-bold transition-colors whitespace-nowrap ${
                        isActive
                          ? "bg-green-400 text-black"
                          : isCompleted
                          ? "text-green-500 border border-green-700"
                          : "text-green-800 hover:text-green-600"
                      }`}
                    >
                      {isCompleted && !isActive ? "✓ " : ""}{cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parts area */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-green-300 uppercase tracking-[0.2em] mb-1">
                Select {activeCategory.label}
              </h2>
              <p className="text-green-700 text-xs">
                Choose a component for your build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentParts.length > 0 ? (
                currentParts.map((part) => {
                  const isSelected = selections[activeCategory.id]?.id === part.id;
                  return (
                    <motion.div
                      key={part.id}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(part)}
                      className={`p-5 border cursor-pointer transition-all flex gap-4 items-start ${
                        isSelected
                          ? "border-green-400 bg-green-950/30"
                          : "border-green-900/40 hover:border-green-700"
                      }`}
                    >
                      {part.imageUrl && (
                        <div className="w-14 h-14 bg-green-950/30 shrink-0 overflow-hidden">
                          <img
                            src={part.imageUrl}
                            alt={part.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-green-200 mb-1 truncate">
                          {part.name}
                        </h3>
                        <p className="text-green-700 text-xs mb-2 leading-relaxed">
                          {part.specs}
                        </p>
                        <p className="text-green-400 text-xs font-bold">
                          ${part.price}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="text-green-400 text-xs font-bold shrink-0">✓</span>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-2 py-12 text-center border border-green-900/30">
                  <p className="text-green-800 text-xs uppercase tracking-[0.2em]">
                    No components available in this category.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="border border-green-900/40 p-6 sticky top-24">
              <span className="text-xs uppercase tracking-[0.3em] text-green-700 block mb-6">
                Build Summary
              </span>

              <div className="space-y-3 mb-8">
                {categories.map((cat) => {
                  const selected = selections[cat.id];
                  return (
                    <div key={cat.id} className="flex justify-between items-start gap-4">
                      <span className="text-green-800 text-xs uppercase tracking-[0.1em] shrink-0">
                        {cat.label}
                      </span>
                      {selected ? (
                        <span className="text-green-400 text-xs text-right truncate max-w-[140px]">
                          {selected.name}
                        </span>
                      ) : (
                        <span className="text-green-900 text-xs italic">—</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-green-900/30 pt-5 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-green-700 text-xs uppercase tracking-[0.15em]">
                    Total Estimate
                  </span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-green-300"
                  >
                    ${totalPrice}
                  </motion.span>
                </div>
                <p className="text-green-900 text-xs mt-1 text-right">
                  Includes assembly &amp; testing fee
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-green-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-green-300 transition-colors"
              >
                Submit Build
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
