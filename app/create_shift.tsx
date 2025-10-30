import { ThemedText } from "@/components/ui/ThemedText";
import { Stack, router } from "expo-router";
import { Alert, View } from "react-native";
import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadow } from "@/components/ui/styles/shadow";
import { FormCreateShift } from "@/components/shift/FormCreateShift";
import BookingScreen, { BookingValue } from "@/components/shift/BookingScreen";
import { SelectDoctor } from "@/components/shift/SelectDoctor";

export default function CreateShift() {
  const [booking, setBooking] = useState<BookingValue | null>(null);
  const [contact, setContact] = useState(false);
  const { text } = useThemeColors();
  const insets = useSafeAreaInsets();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={[
          {
            flexDirection: "row",
            paddingBottom: 10,
            justifyContent: "space-between",
            paddingTop: insets.top,
            alignItems: "center",
            padding: 20,
            height: 100,
            zIndex: 1,
          },
          { ...shadow(4) },
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
            onPress={() => {
              setBooking(null);
              setContact(false);
            }}
          />
          <ThemedText
            style={{
              fontSize: 16,
              color: text,
              fontWeight: "500",
            }}
            onPress={() => {
              setBooking(null);
              setContact(false);
            }}
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
      {booking !== null && !contact && (
        <View style={{ flex: 1 }}>
          <SelectDoctor
            onSelectDoctor={(doctorName: string) => {
              setSelectedDoctor(doctorName);
              setContact(true);
            }}
          />
        </View>
      )}
      {contact && (
        <FormCreateShift booking={booking!} doctores={selectedDoctor!} />
      )}
    </View>
  );
}
