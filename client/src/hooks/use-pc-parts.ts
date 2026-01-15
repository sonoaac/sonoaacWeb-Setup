import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function usePcParts() {
  return useQuery({
    queryKey: [api.pcParts.list.path],
    queryFn: async () => {
      const res = await fetch(api.pcParts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch PC parts");
      return api.pcParts.list.responses[200].parse(await res.json());
    },
  });
}
