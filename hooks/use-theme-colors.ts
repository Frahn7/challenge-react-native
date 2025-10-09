import { useAtomValue } from "jotai";
import { useColorScheme } from "react-native";
import { resolvedThemeAtom } from "@/features/themeAtom";

export function useThemeColors() {
  const system = useColorScheme();
  const pref = useAtomValue(resolvedThemeAtom);
  const scheme = pref === "dark" ? system ?? "light" : pref;

  return {
    bg: scheme === "dark" ? "#000" : "#fff",
    text: scheme === "dark" ? "#fff" : "#000",
  };
}
