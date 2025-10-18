import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { agregarTurno } from "../features/shiftSlice";
import { useDispatch } from "react-redux";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { FormValues } from "@/utils/types";
import { globalStyles } from "@/globalStyle";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "@/utils/utils";
import BookingScreen, { BookingValue } from "@/components/bookingScreen";

export default function CreateShift() {
  const dispatch = useDispatch();
  const [booking, setBooking] = useState<BookingValue | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaForm),
    defaultValues: { paciente: "", medico: "", estado: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const nuevoTurno = {
      id: Date.now(),
      nombrePaciente: data.paciente,
      nombreDoctor: data.medico,
      fecha: booking!.display,
      estado: data.estado,
    };

    console.log(nuevoTurno);

    // dispatch(agregarTurno(nuevoTurno));
    // router.replace("/");
  };

  const { bg, text } = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flexDirection: "row",
          boxShadow: "0 5px 3px -4px gray",
          paddingBottom: 10,
          justifyContent: "space-between",
          paddingTop: 52,
          alignItems: "center",
          padding: 20,
          marginBottom: 20,
          height: 100,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="chevron-back-outline" size={20} color={"black"} />
          <ThemedText
            style={{
              fontSize: 16,
              color: text,
              fontWeight: "500",
            }}
            onPress={() => setBooking(null)}
          >
            Anterior
          </ThemedText>
        </View>
        <ThemedText
          style={{
            fontSize: 16,
            color: text,
          }}
        >
          <Ionicons
            name="close"
            size={35}
            color={"black"}
            onPress={() => {
              Alert.alert(
                "¿Quieres salir?",
                "Si sales, los cambios no se guardarán.",
                [
                  { text: "No", style: "cancel" },
                  { text: "Sí", onPress: () => router.push("/") },
                ],
                { cancelable: true }
              );
            }}
          />
        </ThemedText>
      </View>

      {!booking && (
        <View style={{ flex: 1 }}>
          <BookingScreen onChange={setBooking} />
        </View>
      )}

      {booking && (
        <View>
          <Text>a</Text>
        </View>
      )}
      {/* <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 50,
          gap: 5,
          backgroundColor: bg,
        }}
      >
        <ThemedText style={[globalStyles.TextCreate, { color: text }]}>
          Registra tu turno
        </ThemedText>

        <FadeIn delay={20 * 40}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nombre del paciente"
                style={[
                  globalStyles.InputCreate,
                  {
                    color: bg === "#000" ? "gray" : "black",
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                  },
                  errors.paciente && { borderColor: "red", borderWidth: 1 },
                ]}
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="paciente"
            rules={{ required: true }}
          />
          {errors.paciente && (
            <Text style={globalStyles.ErrorCreate}>
              {errors.paciente.message}
            </Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nombre del medico"
                style={[
                  globalStyles.InputCreate,
                  {
                    color: bg === "#000" ? "gray" : "black",
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                  },
                ]}
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="medico"
            rules={{ required: true }}
          />
          {errors.medico && (
            <Text style={globalStyles.ErrorCreate}>
              {errors.medico.message}
            </Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Estado"
                style={[
                  globalStyles.InputCreate,
                  {
                    color: bg === "#000" ? "gray" : "black",
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                  },
                ]}
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="estado"
            rules={{ required: true }}
          />
          {errors.estado && (
            <Text style={globalStyles.ErrorCreate}>
              {errors.estado.message}
            </Text>
          )}
        </FadeIn>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <ThemedText
            style={{
              color: "black",
              padding: 9,
              borderRadius: 10,
              borderColor: "blue",
              borderWidth: 1,
              backgroundColor: "white",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Crear turno
          </ThemedText>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
