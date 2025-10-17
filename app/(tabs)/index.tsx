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
  const { data, isLoading } = useGetShifts();
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedTurn, setCollapsedTurn] = useState(true);

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

            <View
              style={{
                backgroundColor: "rgb(240, 240, 240)",
                paddingTop: 20,
                paddingBottom: 10,
                alignItems: "center",
                width: "120%",
              }}
            >
              <LinearGradient
                colors={["#9ab79a", "#ffffff"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: "90%",
                  height: 150,
                  borderRadius: 15,
                }}
              />
              <View
                style={{
                  alignSelf: "flex-start",
                  paddingLeft: 20,
                }}
              >
                <View
                  style={{
                    width: 290,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 5,
                  }}
                >
                  <Ionicons name="medkit" size={55} color={"green"} />
                  <ThemedText
                    style={{
                      color: "black",
                      fontWeight: 600,
                      fontSize: 20,
                      paddingBottom: 5,
                    }}
                  >
                    Gestion de turnos
                  </ThemedText>
                </View>
                <ThemedText
                  style={{
                    color: "black",
                    width: 280,
                    fontSize: 16,
                  }}
                >
                  Reserva tus turnos con facilidad!
                </ThemedText>

                <View style={{ width: 340, marginTop: 20, gap: 5 }}>
                  <View
                    style={{
                      paddingLeft: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="location-outline" size={18} />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          gap: 4,
                          marginLeft: 8,
                        }}
                      >
                        Ubicación y horario
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
                    <Collapsible
                      collapsed={collapsed}
                      collapsedHeight={25}
                      style={{
                        gap: 5,
                        paddingLeft: 10,
                        borderTopColor: "black",
                        borderTopWidth: 0.5,
                        paddingTop: 3,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons name="person-outline" size={18} />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              marginLeft: 8,
                            }}
                          >
                            Profesionales
                          </Text>
                        </View>
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
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
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
                        +
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
