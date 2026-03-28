import { useMutation, useQuery } from "@tanstack/react-query";
import type { Donut } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllDonuts() {
  const { actor, isFetching } = useActor();
  return useQuery<Donut[]>({
    queryKey: ["donuts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDonuts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      customerName,
      customerEmail,
      customerPhone,
      items,
    }: {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      items: Array<[bigint, bigint]>;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder(
        customerName,
        customerEmail,
        customerPhone,
        items,
      );
    },
  });
}
