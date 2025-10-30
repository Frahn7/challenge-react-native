import { ThemedText } from "@/components/ui/themed-text";
import { Alert, View } from "react-native";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import BookingScreen, { BookingValue } from "@/components/bookingScreen";
import { FormEditShift } from "@/components/form-edit-shift";
import { shadow } from "@/utils/shadow";

export default function EditShift() {
  const { text } = useThemeColors();
  const [booking, setBooking] = useState<BookingValue | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={[
          {
            flexDirection: "row",
            paddingBottom: 10,
            justifyContent: "space-between",
            paddingTop: 52,
            alignItems: "center",
            padding: 20,
            zIndex: 1,
            height: 100,
          },
          shadow(4),
        ]}
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

      {booking !== null && <FormEditShift booking={booking} />}
    </View>
  );
}
