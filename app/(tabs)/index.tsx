import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const User = {
  Correo: "Francisco@gmail.com",
  Contrasena: "1234",
};

type Inputs = {
  Correo: string;
  Contrasena: string;
};

export default function HomeScreen() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <ThemedView style={styles.Container} className="">
      <ThemedText style={styles.Text}>Iniciar sesion</ThemedText>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Correo"
            style={styles.Input}
            value={value}
            onChangeText={(value) => onChange(value)}
            {...register("Correo", { required: true })}
          />
        )}
        name="Correo"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Contraseña"
            style={styles.Input}
            value={value}
            onChangeText={(value) => onChange(value)}
            secureTextEntry={true}
            {...register("Contrasena", { required: true })}
          />
        )}
        name="Contrasena"
        rules={{ required: true }}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <ThemedText>Ingresar</ThemedText>
      </TouchableOpacity>

      <ThemedText>
        {errors.Correo && (
          <ThemedText style={styles.Error}>Debes ingresar un correo</ThemedText>
        )}
        {errors.Contrasena && (
          <ThemedText style={styles.Error}>
            Debes ingresar una contraseña
          </ThemedText>
        )}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  Input: {
    backgroundColor: "white",
    width: 300,
    color: "black",
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  Error: {
    color: "red",
  },
});
