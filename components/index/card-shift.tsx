import React from "react";
import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";
import { helperDate } from "../../lib/helper-fechas";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { eliminarTurno } from "@/features/shiftSlice";
import { useDeleteShift } from "@/hooks/use-delete-shift";
import { ShiftProps } from "@/utils/types";
import NotificationPush from "../notification-push";

export const CardShift = ({ turno }: { turno: ShiftProps }) => {
  const dispatch = useDispatch();
  const { mutateAsync: deleteShift, isPending } = useDeleteShift();

  const handleDelete = async (id: number) => {
    try {
      dispatch(eliminarTurno(id));
      await deleteShift(id);
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <ThemedView
        style={{
          width: "100%",
          padding: 10,
          height: 230,
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
          borderColor: " rgb(59, 110, 62)",
          paddingBottom: 20,
        }}
      >
        <View style={{ position: "relative" }}>
          <FontAwesome
            name="bell"
            size={24}
            color="rgb(59, 110, 62)"
            style={{ position: "absolute", left: "90%" }}
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
          />
        </View>
        <ThemedText style={{ color: "black", fontSize: 19, fontWeight: 700 }}>
          Paciente:{" "}
          <ThemedText style={{ color: "black", fontWeight: 500 }}>
            {turno.nombrePaciente}
          </ThemedText>
        </ThemedText>
        <ThemedText style={{ color: "black", fontSize: 19, fontWeight: 700 }}>
          Doctor:{" "}
          <ThemedText style={{ color: "black", fontWeight: 500 }}>
            {turno.nombreDoctor}
          </ThemedText>
        </ThemedText>
        <ThemedText style={{ color: "black", fontSize: 19, fontWeight: 700 }}>
          Estado:{" "}
          <ThemedText style={{ color: "black", fontWeight: 500 }}>
            {turno.estado}
          </ThemedText>
        </ThemedText>
        <ThemedText style={{ color: "black", fontSize: 19, fontWeight: 700 }}>
          Fecha:{" "}
          <ThemedText style={{ color: "black", fontWeight: 500 }}>
            {helperDate(turno.fecha)}
          </ThemedText>
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
              gap: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => handleDelete(turno.id)}
              style={{
                borderRadius: 8,
                padding: 8,
              }}
              disabled={isPending}
            >
              <Ionicons name="trash" size={24} color={"red"} />
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
                    telefono: turno.telefono,
                  },
                });
              }}
              style={{
                borderRadius: 8,
                padding: 8,
              }}
            >
              <Ionicons name="pencil" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </View>
  );
};
