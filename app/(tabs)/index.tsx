import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { setTurnos } from "@/features/shiftSlice";
import { useEffect, useState } from "react";
import { useGetShifts } from "@/hooks/use-get-shift";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { CardShift } from "@/components/index/card-shift";
import Collapsible from "react-native-collapsible";
import { globalStyles } from "@/globalStyle";
import { ModalIndex } from "@/components/index/modal-index";
import { IndexColapsed } from "@/components/index/index-colapsed";

export default function HomeScreen() {
  const [collapsedTurn, setCollapsedTurn] = useState(true);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const turnos = useSelector((state: RootState) => state.shifts.turnos);
  const { data, isLoading } = useGetShifts();

  useEffect(() => {
    if (data) {
      dispatch(setTurnos(data));
    }
  }, [data, dispatch]);

  const { bg, text } = useThemeColors();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Stack.Screen options={{ headerShown: false }} />

          <ModalIndex open={modal} onClose={() => setModal(false)} />

          <View
            style={{
              flex: 1,
              paddingTop: 20,
              gap: 5,
              alignItems: "center",
            }}
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
                <Ionicons name="menu-outline" size={40} color={"green"} />
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

            <View
              style={{
                marginTop: 10,
                width: "105%",
              }}
            >
              <TouchableOpacity
                onPress={() => setCollapsedTurn(!collapsedTurn)}
              >
                <Collapsible
                  collapsed={collapsedTurn}
                  collapsedHeight={35}
                  style={{
                    gap: 5,
                    paddingLeft: 10,
                    backgroundColor: "rgb(240, 243, 244)",
                    width: "100%",
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        paddingLeft: 6,
                        fontSize: 16,
                        padding: 3,
                        fontWeight: 700,
                      }}
                    >
                      Turnos
                    </Text>
                    {collapsedTurn ? (
                      <Ionicons
                        name="remove-outline"
                        onPress={() => setCollapsedTurn(!collapsedTurn)}
                        size={20}
                      />
                    ) : (
                      <Text
                        style={{ fontSize: 20 }}
                        onPress={() => setCollapsedTurn(!collapsedTurn)}
                      >
                        <Ionicons
                          name="add-outline"
                          onPress={() => setCollapsedTurn(!collapsedTurn)}
                          size={20}
                        />
                      </Text>
                    )}
                  </View>
                </Collapsible>
              </TouchableOpacity>

              <FadeIn delay={20 * 40}>
                {isLoading ? (
                  <Text style={{ color: "white" }}>Cargando...</Text>
                ) : (
                  collapsedTurn &&
                  turnos.map((turno) => (
                    <CardShift turno={turno} key={turno.id} />
                  ))
                )}
              </FadeIn>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
