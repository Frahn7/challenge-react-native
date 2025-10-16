import { z } from "zod";

export const User = {
  Correo: "F@gmail.com",
  Contrasena: "12345678",
};

export const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schemaForm = z.object({
  id: z.number().optional(),
  paciente: z
    .string({ required_error: "El paciente es obligatorio" })
    .min(1, { message: "Ingresá el nombre del paciente" }),
  medico: z
    .string({ required_error: "El medico es obligatorio" })
    .min(1, { message: "Ingresá el nombre del medico" }),
  estado: z
    .string({ required_error: "El estado es obligatorio" })
    .min(1, { message: "Ingresá el estado" }),
});
