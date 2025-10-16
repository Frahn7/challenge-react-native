import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { agregarTurno } from "../features/shiftSlice";
import { useDispatch } from "react-redux";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FormatDate } from "@/components/format-date";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { helperDate } from "@/components/helper-fechas";
import { FormValues } from "@/utils/types";
import Line from "@/components/line";
import { globalStyles } from "@/globalStyle";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "@/utils/utils";
import {
  BUSINESS_CLOSE,
  BUSINESS_OPEN,
  clampToBusinessHours,
  minDate,
  startOfDay,
} from "@/utils/data-functions";
import { LinearGradient } from "expo-linear-gradient";

export default function CreateShift() {
  const [showPicker, setShowPicker] = useState(false);
  const [fechaSeleccionada, setFechaSeccionada] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const dispatch = useDispatch();

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
      fecha: FormatDate(fechaSeleccionada)!.toString(),
      estado: data.estado,
    };

    dispatch(agregarTurno(nuevoTurno));
    router.replace("/");
  };

  const onDateChange = (_: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (!date) return;
    const chosen = startOfDay(date) < minDate ? new Date(minDate) : date;
    const merged = new Date(
      chosen.getFullYear(),
      chosen.getMonth(),
      chosen.getDate(),
      fechaSeleccionada.getHours(),
      fechaSeleccionada.getMinutes()
    );
    setFechaSeccionada(clampToBusinessHours(merged));
    setShowTimePicker(true);
  };

  const onTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== "set" || !date) return;

    const now = new Date();

    if (date.toDateString() === now.toDateString() && date < now) {
      Alert.alert("Horario no válido", "No podés elegir una hora que ya pasó.");
      return;
    }

    const next = new Date(
      fechaSeleccionada.getFullYear(),
      fechaSeleccionada.getMonth(),
      fechaSeleccionada.getDate(),
      date.getHours(),
      date.getMinutes()
    );

    if (next.getHours() < BUSINESS_OPEN || next.getHours() >= BUSINESS_CLOSE) {
      Alert.alert("Horario no permitido", "Horario maximo 18:00hs.");
      return;
    }

    const clamped = clampToBusinessHours(next);
    setFechaSeccionada(clamped);
    setShowTimePicker(false);
  };

  const { bg, text } = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          paddingLeft: 50,
          gap: 80,
          justifyContent: "flex-start",
          width: 300,
          paddingTop: 52,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="close"
          size={28}
          color={text}
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
      </View>
      <View
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
        <Line />

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

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={{
            borderWidth: 1,
            backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
            padding: 2,
            maxWidth: 200,
            borderRadius: 10,
            alignItems: "center",
            gap: 5,
          }}
        >
          <ThemedText
            style={{
              width: 200,
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Seleccionar fecha
          </ThemedText>
          <Text style={{ textAlign: "center" }}>
            Fecha actual: {helperDate(fechaSeleccionada)}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={fechaSeleccionada ?? new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={minDate}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={fechaSeleccionada ?? new Date()}
            mode="time"
            display="default"
            onChange={(e, date) => {
              onTimeChange(e, date);
            }}
          />
        )}

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
      </View>
    </View>
  );
}
