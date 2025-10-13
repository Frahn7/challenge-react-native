import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const profileAtom = atomWithStorage(
  "profile",
  {
    name: "",
  },
  createJSONStorage(() => AsyncStorage)
);

export const resolvedProfileAtom = atom((get) => get(profileAtom));
