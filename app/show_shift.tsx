import { CollapsedShift } from "@/components/shift/CollapsedShift";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { View } from "react-native";

export default function ShowShift() {
  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Ionicons
        name="chevron-back"
        size={24}
        onPress={() => router.push("/")}
      />
      <CollapsedShift />
    </View>
  );
}
