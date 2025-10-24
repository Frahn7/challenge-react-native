import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import Collapsible from "react-native-collapsible";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { profileAtom } from "@/features/profileAtom";
import { useAtom } from "jotai";
import { ModalLocation } from "./modal-location";

export const IndexColapsed = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [modalLocation, setModalLocation] = useState(false);
  const { bg } = useThemeColors();
  const profile = useAtom(profileAtom);

  return (
    <View
      style={[
        {
          paddingTop: 20,
          paddingBottom: 10,
          alignItems: "center",
          width: "120%",
        },
        { backgroundColor: bg },
      ]}
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
            style={[
              {
                fontWeight: 600,
                fontSize: 20,
                paddingBottom: 5,
              },
              { color: bg === "#000" ? "white" : "black" },
            ]}
          >
            Gestion de turnos
          </ThemedText>
        </View>
        <ThemedText
          style={[
            {
              width: 280,
              fontSize: 16,
            },
            { color: bg === "#000" ? "white" : "black" },
          ]}
        >
          Reserva tus turnos con facilidad!
        </ThemedText>

        <View style={{ marginTop: 20, gap: 5 }}>
          <TouchableOpacity
            style={{
              paddingLeft: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => setModalLocation(true)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color={bg === "#000" ? "white" : "black"}
              />
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: 600,
                    gap: 4,
                    marginLeft: 8,
                  },
                  { color: bg === "#000" ? "white" : "black" },
                ]}
              >
                Ubicación y horarios
              </Text>
            </View>
          </TouchableOpacity>
          {modalLocation && (
            <ModalLocation
              open={modalLocation}
              onClose={() => setModalLocation(false)}
            />
          )}

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
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={bg === "#000" ? "white" : "black"}
                  />
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: 600,
                        marginLeft: 8,
                      },
                      { color: bg === "#000" ? "white" : "black" },
                    ]}
                  >
                    Profesionales
                  </Text>
                </View>
                {collapsed ? (
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={bg === "#000" ? "white" : "black"}
                    onPress={() => setCollapsed(!collapsed)}
                  />
                ) : (
                  <Ionicons
                    name="chevron-up-outline"
                    size={20}
                    color={bg === "#000" ? "white" : "black"}
                    onPress={() => setCollapsed(!collapsed)}
                  />
                )}
              </View>

              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                {profile[0].photo && (
                  <Image
                    source={{ uri: profile[0].photo }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 999,
                      borderWidth: 2,
                    }}
                  />
                )}

                <Text
                  style={[
                    { fontSize: 16, fontWeight: 700 },
                    { color: bg === "#000" ? "white" : "black" },
                  ]}
                >
                  Francisco Villella
                </Text>
              </View>
            </Collapsible>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
