import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { setTurnos } from "@/features/shiftSlice";
import { useEffect, useState } from "react";
import { useGetShifts } from "@/hooks/use-get-shift";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { CardShift } from "@/components/card-shift";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";

import Collapsible from "react-native-collapsible";
import { globalStyles } from "@/globalStyle";

export default function HomeScreen() {
  const turnos = useSelector((state: RootState) => state.shifts.turnos);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetShifts();
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedTurn, setCollapsedTurn] = useState(true);
  const [modal, setModal] = useState(false);

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
          <Modal
            visible={modal}
            transparent
            animationType="fade"
            onRequestClose={() => setModal(false)}
          >
            <View style={[globalStyles.ModalContainer]}>
              <View style={[globalStyles.ModalCardContainer]}>
                <Text
                  style={{ textAlign: "right", padding: 1 }}
                  onPress={() => setModal(false)}
                >
                  <Ionicons name="close-outline" size={30} />
                </Text>
                <View style={[globalStyles.ModalCard]}>
                  <Ionicons name="person-outline" size={24} color="green" />
                  <ThemedText
                    onPress={() => router.push("/login")}
                    style={{
                      color: "black",
                      fontSize: 16,
                      textAlign: "left",
                      marginLeft: 8,
                    }}
                  >
                    Iniciar sesión
                  </ThemedText>
                </View>
              </View>
            </View>
          </Modal>

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
                  margin: 5,
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
                            name="chevron-down-outline"
                            size={20}
                            onPress={() => setCollapsed(!collapsed)}
                          />
                        ) : (
                          <Ionicons
                            name="chevron-up-outline"
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
