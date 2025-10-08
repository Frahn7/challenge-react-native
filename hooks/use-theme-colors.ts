import { useAtomValue } from "jotai";
import { useColorScheme } from "react-native";
import { resolvedThemeAtom } from "@/features/themeAtom";

export function useThemeColors() {
  const system = useColorScheme();
  const pref = useAtomValue(resolvedThemeAtom);
  const scheme = pref === "system" ? system ?? "light" : pref;

  return {
    bg: scheme === "dark" ? "#000" : "#fff",
    text: scheme === "dark" ? "#fff" : "#000",
    card: scheme === "dark" ? "#1c1c1c" : "#f2f2f2",
  };
}
