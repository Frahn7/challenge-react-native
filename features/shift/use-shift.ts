import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShifts } from "./use-get-shift";
import { RootState } from "@/features/store";
import { setTurnos } from "@/features/shift/shiftSlice";

export function useShifts() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetShifts();
  const turnos = useSelector((state: RootState) => state.shifts.turnos);

  useEffect(() => {
    if (data) dispatch(setTurnos(data));
  }, [data, dispatch]);

  return { turnos, isLoading, isError, error };
}
