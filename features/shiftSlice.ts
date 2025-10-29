import { ShiftInterface, ShiftState } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: ShiftState = {
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
    setTurnos: (state, action: PayloadAction<ShiftInterface[]>) => {
      const byId = new Map<string | number, ShiftInterface>();
      for (const t of action.payload) {
        byId.set(t.id, t);
      }
      state.turnos = Array.from(byId.values());
    },
  },
});

export const { agregarTurno, eliminarTurno, editarTurno, setTurnos } =
  shiftSlice.actions;
export default shiftSlice.reducer;
