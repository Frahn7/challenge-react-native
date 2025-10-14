import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { router, Stack } from "expo-router";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAtom } from "jotai";
import { profileAtom } from "@/features/profileAtom";

const User = {
  Correo: "F@gmail.com",
  Contrasena: "12345678",
};

type Inputs = {
  Correo: string;
  Contrasena: string;
};

export default function Login() {
  const [profile, setProfile] = useAtom(profileAtom);
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

    const correo = data.Correo.trim().toLowerCase();
    const correoUser = User.Correo.trim().toLowerCase();

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
      setProfile({ name: User.Correo, photo: "" });
      router.push("/");
    }
  };

  const { bg, text } = useThemeColors();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView style={[styles.Container, { backgroundColor: bg }]}>
        <View style={{ paddingLeft: 250 }}>
          <ThemeToggle />
        </View>
        <ThemedText style={[styles.Text, { color: text }]}>
          Iniciar sesion
        </ThemedText>

        <FadeIn delay={22 * 22}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Correo"
                style={[
                  styles.Input,
                  {
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                    color: bg === "#000" ? "gray" : "black",
                  },
                ]}
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
                style={[
                  styles.Input,
                  {
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                    color: bg === "#000" ? "gray" : "black",
                  },
                ]}
                value={value}
                onChangeText={(value) => onChange(value)}
                secureTextEntry={true}
                {...register("Contrasena", { required: true })}
              />
            )}
            name="Contrasena"
            rules={{ required: true }}
          />
        </FadeIn>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <ThemedText
            style={{
              color: text,
              padding: 9,
              borderRadius: 10,
              borderColor: "blue",
              borderWidth: 1,
              backgroundColor: bg,
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
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    gap: 8,
  },
  Input: {
    width: 300,
    marginBottom: 8,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  Error: {
    color: "red",
  },
});
