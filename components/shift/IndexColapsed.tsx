import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { CollapsedDoctors } from "./CollapsedDoctors";
import { ModalLocation } from "./Modallocation";

export const IndexColapsed = () => {
  const [modalLocation, setModalLocation] = useState(false);
  const { bg } = useThemeColors();

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
          width: "90%",
        }}
      >
        <View
          style={{
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

          <CollapsedDoctors />
        </View>
      </View>
    </View>
  );
};
