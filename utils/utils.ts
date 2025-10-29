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
  telefono: z
    .string({ required_error: "El telefono es obligatorio" })
    .min(1, { message: "Ingresá telefono" }),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .min(1, { message: "Ingresá email" }),
});

export const Days = [
  {
    dia: "Lunes",
    hs: "09:00-18:00",
  },
  {
    dia: "Martes",
    hs: "09:00-18:00",
  },
  {
    dia: "Miercoles",
    hs: "09:00-18:00",
  },
  {
    dia: "Jueves",
    hs: "09:00-18:00",
  },
  {
    dia: "Viernes",
    hs: "09:00-18:00",
  },
];
