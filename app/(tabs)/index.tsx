import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { globalStyles } from "@/globalStyle";
import { ModalIndex } from "@/components/index/modal-index";
import { IndexColapsed } from "@/components/index/index-colapsed";
import { useState } from "react";
import { CollapsedShift } from "@/components/index/collapsed-shift";

export default function HomeScreen() {
  const [modal, setModal] = useState(false);

  const { bg, text } = useThemeColors();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <ScrollView contentContainerStyle={[{ padding: 20 }]}>
          <Stack.Screen options={{ headerShown: false }} />

          <ModalIndex open={modal} onClose={() => setModal(false)} />

          <View
            style={[
              {
                flex: 1,
                paddingTop: 20,
                gap: 5,
                alignItems: "center",
                borderColor: "red",
              },
            ]}
          >
            <View style={globalStyles.IndexHeader}>
              <ThemedText
                style={{
                  fontSize: 18,
                  color: text,
                  fontWeight: "700",
                }}
              >
                Gestion de turnos
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 16,
                  color: text,
                  textDecorationLine: "underline",
                }}
                onPress={() => setModal(true)}
              >
                <Ionicons
                  name="menu-outline"
                  size={40}
                  color={"rgb(59, 110, 62)"}
                />
              </ThemedText>
            </View>

            <IndexColapsed />

            <View style={{ alignItems: "flex-end", width: "100%", margin: 10 }}>
              <TouchableOpacity
                onPress={() => router.push("/create_shift")}
                activeOpacity={0.7}
                style={{
                  backgroundColor: "rgb(59, 110, 62)",
                  borderRadius: 8,
                  width: 150,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{ fontSize: 16, color: "white", textAlign: "center" }}
                >
                  Agendar Servicio
                </ThemedText>
              </TouchableOpacity>
            </View>

            <CollapsedShift />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
