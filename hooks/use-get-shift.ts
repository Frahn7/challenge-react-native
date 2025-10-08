import { useQuery } from "@tanstack/react-query";

export interface ShiftInterface {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  estado: string;
  fecha: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function fetchShifts(): Promise<ShiftInterface[]> {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export function useGetShifts() {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: fetchShifts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
