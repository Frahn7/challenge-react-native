import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShiftInterface {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  fecha: string;
  estado: string;
}

export interface ShiftState {
  turnos: ShiftInterface[];
}

const initialState: ShiftState = {
  turnos: [],
};

const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    agregarTurno: (state, action: PayloadAction<ShiftInterface>) => {
      state.turnos.push(action.payload);
    },
    eliminarTurno: (state, action: PayloadAction<number>) => {
      state.turnos = state.turnos.filter(
        (turno) => turno.id !== action.payload
      );
    },
    editarTurno: (state, action: PayloadAction<ShiftInterface>) => {
      const idx = state.turnos.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.turnos[idx] = action.payload;
      }
    },
  },
});

export const { agregarTurno, eliminarTurno, editarTurno } = shiftSlice.actions;
export default shiftSlice.reducer;
