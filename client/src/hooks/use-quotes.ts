import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertQuote } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateQuote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertQuote) => {
      const res = await fetch(api.quotes.create.path, {
        method: api.quotes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.quotes.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit quote");
      }
      return api.quotes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Quote Requested!",
        description: "We'll get back to you with a detailed estimate shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
