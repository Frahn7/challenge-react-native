import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { router, Stack } from "expo-router";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useAtom } from "jotai";
import { profileAtom } from "@/features/profileAtom";
import { regexCorreo, User } from "./utils/utils";
import { Inputs } from "./utils/types";
import { globalStyles } from "./globalStyle";
import { Ionicons } from "@expo/vector-icons";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Login() {
  const [, setProfile] = useAtom(profileAtom);
  const [ErrorCorreoMessage, setErrorCorreoMessage] = useState("");
  const [ErrorContrasenaMessage, setErrorContrasenaMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const correo = data.Correo.trim().toLowerCase();
    const correoUser = User.Correo.trim().toLowerCase();

    if (!regexCorreo.test(correo)) {
      setErrorCorreoMessage("Ingresa un correo válido");
      ok = false;
      setLoading(false);
    } else if (correo !== correoUser) {
      setErrorCorreoMessage("Usuario no encontrado");
      ok = false;
      setLoading(false);
    }

    if (!data.Contrasena || data.Contrasena.length < 8) {
      setErrorContrasenaMessage("Mínimo 8 caracteres");
      ok = false;
      setLoading(false);
    } else if (data.Contrasena !== User.Contrasena) {
      setErrorContrasenaMessage("Usuario no encontrado");
      ok = false;
      setLoading(false);
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

      <KeyboardAvoidingView
        style={[globalStyles.ContainerLogin, { backgroundColor: bg }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={15}
      >
        <ThemeToggle />
        <ThemedText
          style={[globalStyles.TextLogin, { color: text, marginBottom: 30 }]}
        >
          Ingresar a mi cuenta
          <Ionicons
            name="medkit"
            size={25}
            color={"green"}
            style={{ marginRight: 6 }}
          />
        </ThemedText>

        <ThemedText
          style={{
            color: "black",
            backgroundColor: "lightblue",
            padding: 2,
            borderRadius: 10,
          }}
        >
          F@gmail.com / 12345678
        </ThemedText>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="mail-open"
                size={20}
                color={bg === "#000" ? "gray" : "black"}
                style={{ marginRight: 6 }}
              />
              <TextInput
                placeholder="Correo"
                style={[
                  globalStyles.InputLogin,
                  {
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                    color: bg === "#000" ? "gray" : "black",
                  },
                  errors.Correo && { borderColor: "red", borderWidth: 1 },
                ]}
                value={value}
                onChangeText={(value) => onChange(value)}
                {...register("Correo", { required: true })}
              />
            </View>
          )}
          name="Correo"
        />
        <View style={{ marginTop: -20 }}>
          {errors.Correo && (
            <ThemedText style={globalStyles.Error}>
              Debes ingresar un correo
            </ThemedText>
          )}
          {ErrorCorreoMessage && (
            <ThemedText style={globalStyles.Error}>
              {ErrorCorreoMessage}
            </ThemedText>
          )}
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={bg === "#000" ? "gray" : "black"}
                style={{ marginRight: 6 }}
              />
              <TextInput
                placeholder="Contraseña"
                style={[
                  globalStyles.InputLogin,
                  {
                    backgroundColor: bg === "#000" ? "white" : "#F5F5DC",
                    color: bg === "#000" ? "gray" : "black",
                  },
                  errors.Correo && { borderColor: "red", borderWidth: 1 },
                ]}
                value={value}
                onChangeText={(value) => onChange(value)}
                secureTextEntry={true}
                {...register("Contrasena", { required: true })}
              />
            </View>
          )}
          name="Contrasena"
          rules={{ required: true }}
        />

        <View style={{ marginTop: -20 }}>
          {errors.Contrasena && (
            <ThemedText style={globalStyles.Error}>
              Debes ingresar una contraseña
            </ThemedText>
          )}

          {ErrorContrasenaMessage &&
            ErrorContrasenaMessage !== ErrorCorreoMessage && (
              <ThemedText style={globalStyles.Error}>
                {ErrorContrasenaMessage}
              </ThemedText>
            )}
        </View>

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
              marginTop: 5,
            }}
          >
            {loading ? "..." : "INGRESAR"}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/")}>
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
            INGRESAR COMO INVITADO
          </ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}
