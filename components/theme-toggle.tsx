import { Pressable, Text } from "react-native";
import { useAtom } from "jotai";
import { themeAtom, ThemePref } from "@/features/themeAtom";
import { useThemeColors } from "@/hooks/use-theme-colors";

const order: ThemePref[] = ["light", "dark", "system"];

export function ThemeToggle() {
  const [pref, setPref] = useAtom(themeAtom);
  const { bg, text } = useThemeColors();
  return (
    <Pressable
      onPress={() => setPref(order[(order.indexOf(pref) + 1) % order.length])}
      style={{ padding: 12, backgroundColor: bg }}
    >
      <Text style={{ color: text }}>Cambiar tema: {pref}</Text>
    </Pressable>
  );
}
