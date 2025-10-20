import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export function useDeleteShift() {
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`${id}`);
    },
  });
}
