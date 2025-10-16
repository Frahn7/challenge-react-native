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
