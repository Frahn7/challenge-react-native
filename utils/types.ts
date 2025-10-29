import { z } from "zod";
import { schemaForm } from "./utils";
import { ThemePref } from "@/features/themeAtom";

export type Inputs = {
  Correo: string;
  Contrasena: string;
};

export type InputsForm = {
  id?: number;
  paciente: string;
  medico: string;
  telefono: string;
  email: string;
  
};

export interface Data {
  data: InputsForm;
}

export type FormValues = z.infer<typeof schemaForm>;

export const order: ThemePref[] = ["light", "dark"];

export interface ShiftProps {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  fecha: string;
  telefono: string;
    email: string;
  
}
export interface ShiftInterface {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  fecha: string;
  telefono: string;
    email: string;
  
}

export interface ShiftState {
  turnos: ShiftInterface[];
}

export type Props = { open: boolean; onClose: () => void };
