import { CollapsedShift } from "@/components/shift/CollapsedShift";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShowShift() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Ionicons
          name="chevron-back"
          size={24}
          onPress={() => router.push("/")}
        />
        <CollapsedShift />
      </ScrollView>
    </SafeAreaView>
  );
}
