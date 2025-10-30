import { ThemedText } from "@/components/ui/themed-text";
import { Stack, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/features/theme/use-theme-colors";
import { ModalIndex } from "@/components/shift/modal-index";
import { IndexColapsed } from "@/components/shift/index-colapsed";
import { useState } from "react";
import { globalStyles } from "../../globalStyle";
import { textButtons } from "@/utils/types";
import { MedicalServiceCard } from "@/components/shift/medical-services";
import { medics } from "@/utils/utils";
import Collapsible from "react-native-collapsible";

export default function HomeScreen() {
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
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
            <View
              style={{
                width: "100%",
                margin: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {textButtons.map((text, k) => (
                <TouchableOpacity
                  key={k}
                  onPress={() => router.push(text.route)}
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
                    style={{
                      fontSize: 16,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {text.title}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <TouchableOpacity onPress={() => setCollapsed((p) => !p)}>
                <View
                  style={{
                    backgroundColor: "#EEF1F4",
                    borderRadius: 12,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#101828",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Servicios
                  </Text>

                  <Text
                    style={{
                      color: "#101828",
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    {collapsed ? "+" : "−"}
                  </Text>
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapsed} style={{ gap: 10 }}>
                {medics.map((medic, k) => (
                  <MedicalServiceCard
                    key={k}
                    specialty={medic.specialty}
                    doctor={medic.doctor}
                    durationMin={medic.durationMin}
                    priceLabel={medic.priceLabel}
                    images={[medic.images]}
                    description={medic.description}
                    onPress={() => router.push("/create_shift")}
                  />
                ))}
              </Collapsible>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
