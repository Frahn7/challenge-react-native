import React from "react";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";
import { helperDate } from "./helper-fechas";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { eliminarTurno } from "@/features/shiftSlice";
import NotificationPush from "./notification-push";

interface ShiftProps {
  id: number;
  nombrePaciente: string;
  nombreDoctor: string;
  estado: string;
  fecha: string;
}

export const CardShift = ({ turno }: { turno: ShiftProps }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(eliminarTurno(id));
    router.replace("/");
  };

  return (
    <View>
      <ThemedView
        style={{
          flexDirection: "row",
          backgroundColor: "gray",
          marginTop: 14,
          gap: 6,
          width: 300,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
      >
        <ThemedText>{turno.nombrePaciente}</ThemedText>
        <ThemedText>{turno.nombreDoctor}</ThemedText>
        <ThemedText>{turno.estado}</ThemedText>
        <ThemedText>{helperDate(turno.fecha)}</ThemedText>
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
        <TouchableOpacity
          onPress={async () => {
            await NotificationPush({
              title: "Turno medico!",
              body: `Hola! tu turno medico esta programado para el dia ${helperDate(
                turno.fecha
              )}! no te olvides`,
              time: 1,
              text: `Hola! test de mi turno del ${helperDate(turno.fecha)}.`,
            });
          }}
        >
          <FontAwesome name="bell" size={24} color="green" />
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
};
