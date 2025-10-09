import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { agregarTurno } from "../features/shiftSlice";
import { useDispatch } from "react-redux";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FormatDate } from "@/components/format-date";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Ionicons } from "@expo/vector-icons";

type Inputs = {
  id: number;
  paciente: string;
  medico: string;
  fecha: string;
  estado: string;
};

export default function CreateShift() {
  const [showPicker, setShowPicker] = useState(false);
  const [fechaSeleccionada, setFechaSeccionada] = useState(new Date());

  const { register, handleSubmit, control } = useForm<Inputs>();
  const dispatch = useDispatch();

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setFechaSeccionada(date);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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

  const { bg, text } = useThemeColors();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          paddingLeft: 50,
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 50,
          gap: 5,
        }}
      >
        <ThemedText style={[styles.Text, { color: text }]}>
          Registra tu turno!
        </ThemedText>

        <FadeIn delay={20 * 40}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nombre del paciente"
                style={[
                  styles.Input,
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
                placeholder="Nombre del medico"
                style={[
                  styles.Input,
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
                placeholder="Estado"
                style={[
                  styles.Input,
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
              styles.Input,
              {
                color: bg === "#000" ? "gray" : "black",
                backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                padding: 4,
              },
            ]}
          >
            Seleccionar fecha
          </ThemedText>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={fechaSeleccionada ?? new Date()}
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
            Crear turno
          </ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: 300,
    color: "black",
    marginBottom: 5,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  Error: {
    color: "red",
  },
});
