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
          width: "100%",
          padding: 10,
          height: 190,
          gap: 6,
          backgroundColor: "white",
          overflow: "hidden",
          alignItems: "flex-start",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 7,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
          marginTop: 14,
          borderWidth: 0.5,
          borderRadius: 8,
        }}
      >
        <ThemedText style={{ color: "black", fontSize: 18 }}>
          Paciente: {turno.nombrePaciente}
        </ThemedText>
        <ThemedText style={{ color: "black", fontSize: 18 }}>
          Doctor: {turno.nombreDoctor}
        </ThemedText>
        <ThemedText style={{ color: "black", fontSize: 18 }}>
          Estado: {turno.estado}
        </ThemedText>
        <ThemedText style={{ color: "black", fontSize: 18 }}>
          Fecha: {helperDate(turno.fecha)}
        </ThemedText>
        <ThemedText
          style={{
            color: "black",
            fontSize: 13,
            textDecorationLine: "underline",
          }}
        >
          Mas informacion
        </ThemedText>
        <View
          style={{
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="trash-o"
              size={24}
              color="red"
              onPress={() => handleDelete(turno.id)}
            />

            <FontAwesome
              name="pencil"
              size={24}
              color="black"
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
            />

            <ThemedText
              style={{
                fontSize: 14,
                backgroundColor: "rgb(59, 110, 62)",
                color: "white",
                borderRadius: 8,
                padding: 6,
              }}
            >
              Agendar Servicio
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </View>
  );
};
