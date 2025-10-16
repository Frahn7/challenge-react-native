import { Pressable, Text } from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "@/features/themeAtom";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { order } from "@/utils/types";

export function ThemeToggle() {
  const [pref, setPref] = useAtom(themeAtom);
  const { bg, text } = useThemeColors();
  return (
    <Pressable
      onPress={() => setPref(order[(order.indexOf(pref) + 1) % order.length])}
      style={{
        padding: 12,
        backgroundColor: bg,
        alignItems: "center",
      }}
    >
      <Text style={{ color: text }}>
        {<Ionicons name="power-outline" size={24} color={text} />}
      </Text>
      <Text style={{ color: text, fontSize: 15 }}>{pref}</Text>
    </Pressable>
  );
}
