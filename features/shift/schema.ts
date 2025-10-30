import { z } from "zod";

export const schemaForm = z.object({
  id: z.number().optional(),
  paciente: z
    .string({ required_error: "El paciente es obligatorio" })
    .min(1, { message: "Ingresá el nombre del paciente" }),
  telefono: z
    .string({ required_error: "El telefono es obligatorio" })
    .min(1, { message: "Ingresá telefono" }),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .min(1, { message: "Ingresá email" }),
});
