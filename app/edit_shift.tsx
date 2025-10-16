import { ThemedText } from "@/components/themed-text";
import { TextInput, TouchableOpacity, View } from "react-native";
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
import { Data, InputsForm } from "@/utils/types";

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

  const { register, handleSubmit, control } = useForm<InputsForm>({
    defaultValues: {
      paciente: name,
      medico: doctor,
      estado: estado,
      fecha: fecha,
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

  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    mutation.mutate({ data });
  };

  const { bg, text } = useThemeColors();

  ("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 50,
        gap: 3,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          gap: 80,
          justifyContent: "flex-start",
          width: 300,
          paddingTop: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={text}
          onPress={() => router.push("/")}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <ThemedText style={[globalStyles.TextEdit, { color: text }]}>
          Editar Turnos!
        </ThemedText>
      </View>

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
              ]}
              value={value}
              onChangeText={(value) => onChange(value)}
              {...register("paciente", { required: true })}
            />
          )}
          name="paciente"
          rules={{ required: true }}
        />
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
              {...register("medico", { required: true })}
            />
          )}
          name="medico"
          rules={{ required: true }}
        />

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
              {...register("estado", { required: true })}
            />
          )}
          name="estado"
          rules={{ required: true }}
        />
      </FadeIn>

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <ThemedText
          style={[
            globalStyles.InputEdit,
            {
              color: bg === "#000" ? "gray" : "black",
              backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
              marginBottom: 10,
            },
          ]}
        >
          Seleccionar fecha
        </ThemedText>
      </TouchableOpacity>

      <ThemedText
        style={[
          {
            color: text,
            width: 300,
            textAlign: "center",
          },
        ]}
      >
        Fecha seleccionada: {helperDate(fechaSeleccionada)}
      </ThemedText>

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
