import { ThemedText } from "@/components/themed-text";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FormatDate } from "@/components/format-date";
import { editarTurno } from "../features/shiftSlice";

type Inputs = {
  id: number;
  paciente: string;
  medico: string;
  fecha: string;
  estado: string;
};

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

  const { register, handleSubmit, control } = useForm<Inputs>({
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      editarTurno({
        id: Number(id),
        nombrePaciente: data.paciente,
        nombreDoctor: data.medico,
        estado: data.estado,
        fecha: FormatDate(fechaSeleccionada)!.toString(),
      })
    );
    router.replace("/");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <ThemedText>Editar Turnos!</ThemedText>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={name}
            style={styles.Input}
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
            style={styles.Input}
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
            style={styles.Input}
            value={value}
            onChangeText={(value) => onChange(value)}
            {...register("estado", { required: true })}
          />
        )}
        name="estado"
        rules={{ required: true }}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <ThemedText style={[styles.Input, { marginBottom: 10 }]}>
          Seleccionar fecha
        </ThemedText>
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

const styles = StyleSheet.create({
  Input: {
    backgroundColor: "white",
    width: 300,
    color: "black",
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
