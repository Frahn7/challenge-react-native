import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { setTurnos } from "@/features/shiftSlice";
import React, { useEffect, useState } from "react";
import { useGetShifts } from "@/hooks/use-get-shift";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { CardShift } from "@/components/card-shift";
import { LinearGradient } from "expo-linear-gradient";
import Collapsible from "react-native-collapsible";

export default function HomeScreen() {
  const turnos = useSelector((state: RootState) => state.shifts.turnos);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const { data, isLoading } = useGetShifts();

  useEffect(() => {
    if (data) {
      dispatch(setTurnos(data));
    }
  }, [data, dispatch]);

  const { bg, text } = useThemeColors();

  // onPress={() => router.push("/create_shift")}

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Stack.Screen options={{ headerShown: false }} />
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              gap: 5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 70,
                boxShadow: "0 5px 3px -4px gray",
                paddingBottom: 20,
                width: 400,
                marginBottom: 20,
                justifyContent: "center",
              }}
            >
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
                onPress={() => router.push("/login")}
              >
                Iniciar sesión
              </ThemedText>
            </View>

            <LinearGradient
              colors={["#9ab79a", "#ffffff"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 300,
                height: 150,
                borderRadius: 15,
              }}
            />
            <View
              style={{
                width: 290,
                padding: 3,
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 5,
              }}
            >
              <Ionicons name="medkit" size={40} color={"green"} />
              <ThemedText style={{ color: "black", fontWeight: 600 }}>
                Gestion de turnos
              </ThemedText>
            </View>
            <ThemedText
              style={{
                color: "black",
                width: 280,
                marginTop: -4,
                fontSize: 14,
              }}
            >
              Gestiona tus turnos!
            </ThemedText>
            <View style={{ width: 300 }}>
              <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
                <Collapsible
                  collapsed={collapsed}
                  collapsedHeight={20}
                  style={{
                    gap: 5,
                    paddingLeft: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        gap: 4,
                      }}
                    >
                      <Ionicons name="person-outline" size={18} />
                      Profesionales
                    </Text>
                    {collapsed ? (
                      <Ionicons
                        name="arrow-down-outline"
                        size={20}
                        onPress={() => setCollapsed(!collapsed)}
                      />
                    ) : (
                      <Ionicons
                        name="arrow-up-outline"
                        size={20}
                        onPress={() => setCollapsed(!collapsed)}
                      />
                    )}
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: 700 }}>
                    Francisco Villella
                  </Text>
                </Collapsible>
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <FadeIn delay={20 * 40}>
                {isLoading ? (
                  <Text style={{ color: "white" }}>Cargando...</Text>
                ) : (
                  turnos.map((turno) => (
                    <CardShift turno={turno} key={turno.id} />
                  ))
                )}
              </FadeIn>
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
