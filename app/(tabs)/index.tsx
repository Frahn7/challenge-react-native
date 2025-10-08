import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import { ThemedView } from "@/components/themed-view";
import { FontAwesome } from "@expo/vector-icons";
import { eliminarTurno } from "@/features/shiftSlice";
import React from "react";

export default function HomeScreen() {
  const turnos = useSelector((state: RootState) => state.shifts.turnos);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(eliminarTurno(id));
    router.replace("/");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 50,
          gap: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{
              fontSize: 25,
              color: "white",
            }}
          >
            Gestion de turnos
          </ThemedText>

          <TouchableOpacity onPress={() => router.push("/create_shift")}>
            <ThemedText
              style={{
                fontSize: 20,
                color: "black",
                padding: 2,
                width: 50,
                borderRadius: 999,
                borderColor: "blue",
                borderWidth: 1,
                backgroundColor: "white",
                textAlign: "center",
              }}
            >
              +
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 7,
          }}
        >
          {turnos.map((turno) => (
            <View key={turno.id}>
              <ThemedView
                style={{
                  flexDirection: "row",
                  backgroundColor: "gray",
                  gap: 6,
                  width: 300,
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <ThemedText>{turno.nombrePaciente}</ThemedText>
                <ThemedText>{turno.nombreDoctor}</ThemedText>
                <ThemedText>{turno.fecha}</ThemedText>
                <ThemedText>{turno.estado}</ThemedText>
              </ThemedView>
              <ThemedView
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 12,
                  padding: 5,
                }}
              >
                <TouchableOpacity onPress={() => handleDelete(turno.id)}>
                  <FontAwesome name="trash-o" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/edit_shift",
                      params: {
                        id: turno.id,
                        name: turno.nombrePaciente,
                        doctor: turno.nombreDoctor,
                        estado: turno.estado,
                        fecha: turno.fecha,
                      },
                    });
                  }}
                >
                  <FontAwesome name="pencil" size={24} color="white" />
                </TouchableOpacity>
              </ThemedView>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
