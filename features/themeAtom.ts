import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemePref = "light" | "dark" | "system";

export const themeAtom = atomWithStorage<ThemePref>(
  "theme-pref",
  "system",
  createJSONStorage(() => AsyncStorage)
);

export const resolvedThemeAtom = atom((get) => get(themeAtom));
