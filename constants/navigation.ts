import { Href } from "expo-router";

type Btn = { title: string; route: Href };

export const textButtons: Btn[] = [
  {
    title: "Ver turnos",
    route: "/show_shift",
  },
];
