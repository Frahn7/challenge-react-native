import { z } from "zod";
import { ThemePref } from "@/features/theme/themeAtom";
import { schemaForm } from "@/features/shift/schema";

export type Inputs = {
  Correo: string;
  Contrasena: string;
};

export type FormValues = z.infer<typeof schemaForm>;

export const order: ThemePref[] = ["light", "dark"];

export interface ShiftInterface {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  fecha: string;
  telefono: string;
  email: string;
  observaciones: string;
}

export interface ShiftState {
  turnos: ShiftInterface[];
}

export type Props = { open: boolean; onClose: () => void };

export type PropsDoctor = {
  specialty: string;
  doctor: string;
  durationMin: number;
  priceLabel: string;
  images?: string[];
  description?: string;
  onPress?: () => void;
};
