import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShiftInterface } from "@/utils/types";
import { api } from "./use-delete-shift";

export function useEditShift() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ShiftInterface>;
    }) => {
      const res = await api.put<ShiftInterface>(`${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shifts"] });
    },
  });
}
