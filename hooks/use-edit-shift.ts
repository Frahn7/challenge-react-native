import { useMutation } from "@tanstack/react-query";
import { api } from "./use-delete-shift";

export interface ShiftInterface {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  fecha: string;
  estado: string;
  telefono: string;
}

type EditPayload = {
  id: number;
  data: Partial<ShiftInterface>;
};

export function useEditShift() {
  return useMutation({
    mutationFn: async ({ id, data }: EditPayload) => {
      const res = await api.put<ShiftInterface>(`${id}`, data);
      return res.data;
    },
  });
}
