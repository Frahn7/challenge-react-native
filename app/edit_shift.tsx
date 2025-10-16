import { ThemedText } from "@/components/themed-text";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FormatDate } from "@/components/format-date";
import { editarTurno } from "../features/shiftSlice";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { helperDate } from "@/components/helper-fechas";
import { globalStyles } from "@/globalStyle";
import { Data, FormValues } from "@/utils/types";
import Line from "@/components/line";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "@/utils/utils";

export default function EditShift() {
  const { id, name, doctor, estado, fecha } = useLocalSearchParams<{
    id: string;
    name: string;
    doctor: string;
    estado: string;
    fecha: string;
  }>();

  const [dia, mes, año] = fecha.split("/");
  const fechaFormateada = new Date(Number(año), Number(mes) - 1, Number(dia));
  const inicial = fechaFormateada || new Date();
  const [showPicker, setShowPicker] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(inicial);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      paciente: name,
      medico: doctor,
      estado: estado,
    },
  });
  const dispatch = useDispatch();

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && date) {
      setFechaSeleccionada(date);
    }
    setShowPicker(false);
  };

  const mutation = useMutation({
    mutationFn: async ({ data }: Data) => {
      dispatch(
        editarTurno({
          id: Number(id),
          nombrePaciente: data.paciente,
          nombreDoctor: data.medico,
          estado: data.estado,
          fecha: FormatDate(fechaSeleccionada)!.toString(),
        })
      );
      return data;
    },
    onSuccess: () => {
      router.replace("/");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate({ data });
  };

  const { bg, text } = useThemeColors();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: bg,
        gap: 5,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
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
      <View style={{ paddingTop: 50 }}>
        <ThemedText style={[globalStyles.TextCreate, { color: text }]}>
          Editar Turnos!
        </ThemedText>
      </View>
      <Line />

      <FadeIn delay={20 * 40}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={name}
              style={[
                globalStyles.InputEdit,
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
              placeholder={doctor}
              style={[
                globalStyles.InputEdit,
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
          <Text style={globalStyles.ErrorCreate}>{errors.medico.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={estado}
              style={[
                globalStyles.InputEdit,
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
          <Text style={globalStyles.ErrorCreate}>{errors.estado.message}</Text>
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
          value={fechaSeleccionada}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <ThemedText
          style={{
            color: "black",
            padding: 9,
            borderRadius: 10,
            marginTop: 20,
            borderColor: "blue",
            borderWidth: 1,
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          Editar turno
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
