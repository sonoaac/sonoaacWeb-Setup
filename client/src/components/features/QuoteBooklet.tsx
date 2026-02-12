import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calculator, Loader2 } from "lucide-react";
import { useCreateQuote } from "@/hooks/use-quotes";
import { type InsertQuote } from "@shared/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface QuoteBookletProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Client-side schema for form validation
const formSchema = z.object({
  contactName: z.string().min(1, "Name is required"),
  contactEmail: z.string().email("Invalid email"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function QuoteBooklet({ open, onOpenChange }: QuoteBookletProps) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    pageCount: "1-3 Pages",
    complexity: "Basic (HTML/CSS)",
    features: [] as string[],
    addons: [] as string[],
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const createQuote = useCreateQuote();

  const calculateEstimate = () => {
    let total = 0;
    
    // Base price per page range
    if (selections.pageCount === "1-3 Pages") total += 500;
    else if (selections.pageCount === "4-7 Pages") total += 1200;
    else total += 2000;

    // Complexity multiplier
    if (selections.complexity === "React/Next.js") total *= 1.5;
    if (selections.complexity === "Full Stack") total *= 2.0;

    // Features
    total += selections.features.length * 200;
    
    // Addons
    total += selections.addons.length * 150;

    return total;
  };

  const onSubmit = (data: FormValues) => {
    const payload: InsertQuote = {
      pageCount: selections.pageCount,
      complexity: selections.complexity,
      features: selections.features,
      addons: selections.addons,
      estimatedPrice: calculateEstimate(),
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      message: data.message,
    };

    createQuote.mutate(payload, {
      onSuccess: () => {
        onOpenChange(false);
        // Reset state after slight delay
        setTimeout(() => {
          setStep(1);
          reset();
        }, 500);
      },
    });
  };

  const steps = [
    {
      id: 1,
      title: "How many pages?",
      options: ["1-3 Pages", "4-7 Pages", "8+ Pages", "Custom"],
      key: "pageCount" as const,
    },
    {
      id: 2,
      title: "Technical Complexity",
      options: ["Basic (HTML/CSS)", "React/Next.js", "Full Stack", "CMS (WordPress/Shopify)"],
      key: "complexity" as const,
    },
    {
      id: 3,
      title: "Key Features",
      options: ["Contact Form", "Google Maps", "Photo Gallery", "Blog System", "User Auth", "Search"],
      multi: true,
      key: "features" as const,
    },
    {
      id: 4,
      title: "Add-ons",
      options: ["SEO Optimization", "E-commerce Setup", "Hosting Setup", "Logo Design"],
      multi: true,
      key: "addons" as const,
    },
    {
      id: 5,
      title: "Final Details",
      isForm: true,
    }
  ];

  const handleOptionClick = (option: string, key: "pageCount" | "complexity" | "features" | "addons", multi = false) => {
    if (multi) {
      const current = selections[key] as string[];
      if (current.includes(option)) {
        setSelections({ ...selections, [key]: current.filter(i => i !== option) });
      } else {
        setSelections({ ...selections, [key]: [...current, option] });
      }
    } else {
      setSelections({ ...selections, [key]: option });
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    const currentStep = steps[step - 1];

    if (currentStep.isForm) {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="p-6 bg-gray-900 rounded-xl mb-6 border border-gray-800">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 font-code">Estimated Range</h4>
            <div className="text-3xl sm:text-4xl font-bold text-gradient font-code">
              ${calculateEstimate()} - ${Math.round(calculateEstimate() * 1.2)}
            </div>
            <p className="text-xs text-gray-500 mt-2">*Final price may vary based on specific requirements.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2 font-code">Name</label>
              <input
                {...register("contactName")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-800 bg-gray-900 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all placeholder:text-gray-600"
                placeholder="John Doe"
              />
              {errors.contactName && <p className="text-pink-500 text-xs mt-1">{errors.contactName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2 font-code">Email</label>
              <input
                {...register("contactEmail")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-800 bg-gray-900 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all placeholder:text-gray-600"
                placeholder="john@example.com"
              />
              {errors.contactEmail && <p className="text-pink-500 text-xs mt-1">{errors.contactEmail.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2 font-code">Project Details (Optional)</label>
              <textarea
                {...register("message")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-800 bg-gray-900 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all min-h-[100px] placeholder:text-gray-600"
                placeholder="Any specific design references or deadlines?"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={createQuote.isPending}
            className="w-full py-4 mt-6 rounded-xl font-bold text-white bg-gradient-primary hover-glow-pink transition-all flex items-center justify-center gap-2 text-lg"
          >
            {createQuote.isPending ? <Loader2 className="animate-spin" /> : "Submit Request"}
          </button>
        </form>
      );
    }

    return (
      <div className="space-y-3">
        {currentStep.options?.map((option) => {
          // @ts-ignore - dynamic key access safe due to type structure
          const isSelected = currentStep.multi 
            // @ts-ignore
            ? selections[currentStep.key].includes(option)
            // @ts-ignore
            : selections[currentStep.key] === option;

          return (
            <motion.div
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(option, currentStep.key as any, currentStep.multi)}
              className={`
                p-4 rounded-xl cursor-pointer border-2 transition-all flex items-center justify-between font-bold
                ${isSelected 
                  ? "border-pink-500 bg-pink-500/10 text-pink-500 hover-glow-pink" 
                  : "border-gray-800 hover:border-green-500 bg-gray-900 text-gray-300 hover:text-white hover-glow-green"}
              `}
            >
              <span className="font-bold">{option}</span>
              {isSelected && <Check size={20} className="text-pink-500" />}
            </motion.div>
          );
        })}
        
        {currentStep.multi && (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full py-3 mt-6 flex items-center justify-center gap-2 text-gray-300 hover:text-green-500 font-bold transition-all font-code text-lg"
          >
            Next Step <ChevronRight size={20} />
          </button>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden bg-black/95 backdrop-blur-xl border-2 border-gray-900 shadow-2xl shadow-pink-500/20 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-white text-3d">
            <Calculator className="text-pink-500" size={32} />
            <span className="text-gradient">Project Estimate</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-code text-sm mt-2">
            Step {step} of 5: <span className="text-green-500">{steps[step - 1].title}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="h-2 w-full bg-gray-900 rounded-full mb-8 overflow-hidden border border-gray-800">
            <motion.div 
              className="h-full bg-gradient-primary glow-pink"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
