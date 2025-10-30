import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { agregarTurno, eliminarTurno } from "@/features/shift/hooks/shiftSlice";
import axios from "axios";
import { ShiftInterface } from "@/utils/types";

type Ctx = { tempId: number };

export const useInsertShift = () => {
  const dispatch = useDispatch();
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  return useMutation<ShiftInterface, unknown, ShiftInterface, Ctx>({
    mutationFn: async (shift: ShiftInterface) => {
      const { data } = await axios.post<ShiftInterface>(`${API_URL}`, shift, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },

    onMutate: async (shift) => {
      const tempId = shift.id ?? Date.now();
      dispatch(
        agregarTurno({
          ...shift,
          id: tempId,
        } as ShiftInterface)
      );
      return { tempId };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.tempId) dispatch(eliminarTurno(ctx.tempId));
    },

    onSuccess: (saved, _vars, ctx) => {
      if (ctx?.tempId && saved.id !== ctx.tempId) {
        dispatch(eliminarTurno(ctx.tempId));
        dispatch(agregarTurno(saved));
      } else {
        dispatch(eliminarTurno(saved.id));
        dispatch(agregarTurno(saved));
      }
    },
  });
};
