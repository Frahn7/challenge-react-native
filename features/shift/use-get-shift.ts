import { ShiftInterface } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function fetchShifts(): Promise<ShiftInterface[]> {
  const { data } = await axios.get(`${API_URL}`);
  return data;
}

export function useGetShifts() {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: fetchShifts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
