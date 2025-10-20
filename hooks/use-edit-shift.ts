import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./use-delete-shift";

export interface ShiftInterface {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  fecha: string;
  estado: string;
  telefono: string;
}

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
