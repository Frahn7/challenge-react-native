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
  estado: string;
};

export interface Data {
  data: InputsForm;
}

export type FormValues = z.infer<typeof schemaForm>;

export const order: ThemePref[] = ["light", "dark"];
