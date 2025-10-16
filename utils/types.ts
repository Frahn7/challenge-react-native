import { z } from "zod";
import { schemaForm } from "./utils";

export type Inputs = {
  Correo: string;
  Contrasena: string;
};

export type InputsForm = {
  id: number;
  paciente: string;
  medico: string;
  fecha: string;
  estado: string;
};

export interface Data {
  data: InputsForm;
}

export type FormValues = z.infer<typeof schemaForm>;
