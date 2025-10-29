import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { Alert, View } from "react-native";
import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BookingScreen, { BookingValue } from "@/components/bookingScreen";
import { FormCreateShift } from "@/components/form-create-shift";

export default function CreateShift() {
  const [booking, setBooking] = useState<BookingValue | null>(null);
  const { text } = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flexDirection: "row",
          boxShadow: "0 5px 3px -4px gray",
          paddingBottom: 10,
          justifyContent: "space-between",
          paddingTop: insets.top,
          alignItems: "center",
          padding: 20,
          height: 100,
          zIndex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={"black"}
            onPress={() => setBooking(null)}
          />
          <ThemedText
            style={{
              fontSize: 16,
              color: text,
              fontWeight: "500",
            }}
            onPress={() => setBooking(null)}
          >
            Anterior
          </ThemedText>
        </View>
        <ThemedText
          style={{
            fontSize: 16,
            color: text,
          }}
        >
          <Ionicons
            name="close"
            size={35}
            color={"black"}
            onPress={() => {
              Alert.alert(
                "¿Quieres salir?",
                "Si sales, los cambios no se guardarán.",
                [
                  { text: "No", style: "cancel" },
                  { text: "Sí", onPress: () => router.push("/") },
                ],
                { cancelable: true }
              );
            }}
          />
        </ThemedText>
      </View>

      {!booking && (
        <View style={{ flex: 1 }}>
          <BookingScreen onChange={setBooking} />
        </View>
      )}
      {booking !== null && <FormCreateShift booking={booking} />}
    </View>
  );
}
