import { Pressable } from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "@/features/themeAtom";
import { Ionicons } from "@expo/vector-icons";
import { order } from "@/utils/types";

export function ThemeToggle() {
  const [pref, setPref] = useAtom(themeAtom);
  return (
    <Pressable
      onPress={() => setPref(order[(order.indexOf(pref) + 1) % order.length])}
      style={{
        padding: 12,
        alignItems: "center",
      }}
    >
      <Ionicons name="power-outline" size={24} color={"black"} />
    </Pressable>
  );
}
