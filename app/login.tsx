import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { router, Stack } from "expo-router";

const User = {
  Correo: "F@gmail.com",
  Contrasena: "12345678",
};

type Inputs = {
  Correo: string;
  Contrasena: string;
};

export default function Login() {
  const [ErrorCorreoMessage, setErrorCorreoMessage] = useState("");
  const [ErrorContrasenaMessage, setErrorContrasenaMessage] = useState("");
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setErrorCorreoMessage("");
    setErrorContrasenaMessage("");

    let ok = true;

    const correo = (data.Correo || "").trim().toLowerCase();
    const correoUser = (User.Correo || "").trim().toLowerCase();

    if (!regexCorreo.test(correo)) {
      setErrorCorreoMessage("Ingresa un correo válido");
      ok = false;
    } else if (correo !== correoUser) {
      setErrorCorreoMessage("Usuario no encontrado");
      ok = false;
    }

    if (!data.Contrasena || data.Contrasena.length < 8) {
      setErrorContrasenaMessage("Mínimo 8 caracteres");
      ok = false;
    } else if (data.Contrasena !== User.Contrasena) {
      setErrorContrasenaMessage("Usuario no encontrado");
      ok = false;
    }

    if (ok) {
      router.push("/");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.Container}>
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
          rules={{
            required: true,
          }}
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
            Ingresar
          </ThemedText>
        </TouchableOpacity>

        <ThemedView>
          {errors.Correo && (
            <ThemedText style={styles.Error}>
              Debes ingresar un correo
            </ThemedText>
          )}
          {errors.Contrasena && (
            <ThemedText style={styles.Error}>
              Debes ingresar una contraseña
            </ThemedText>
          )}
          {ErrorCorreoMessage && (
            <ThemedText style={styles.Error}>{ErrorCorreoMessage}</ThemedText>
          )}
          {ErrorContrasenaMessage &&
            ErrorContrasenaMessage !== ErrorCorreoMessage && (
              <ThemedText style={styles.Error}>
                {ErrorContrasenaMessage}
              </ThemedText>
            )}
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 200,
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
