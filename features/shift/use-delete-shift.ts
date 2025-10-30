import { eliminarTurno } from "@/features/shift/shiftSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export function useDeleteShift() {
  const qc = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`${id}`);
      return id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["shifts"] });
      dispatch(eliminarTurno(id));
    },
  });
}
