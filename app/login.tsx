import {
  KeyboardAvoidingView,
  Platform,
  Text,
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
import { regexCorreo, User } from "../utils/utils";
import { Inputs } from "../utils/types";
import { globalStyles } from "../globalStyle";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";

export default function Login() {
  const { bg, text } = useThemeColors();
  const [, setProfile] = useAtom(profileAtom);
  const [ErrorCorreoMessage, setErrorCorreoMessage] = useState("");
  const [ErrorContrasenaMessage, setErrorContrasenaMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const showPasswords = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setErrorCorreoMessage("");
    setErrorContrasenaMessage("");

    let ok = true;
    const correo = data.Correo.trim().toLowerCase();
    const correoUser = User.Correo.trim().toLowerCase();

    if (!regexCorreo.test(correo)) {
      setErrorCorreoMessage("*Email inválido");
      ok = false;
    } else if (correo !== correoUser) {
      setErrorCorreoMessage("*Usuario no encontrado");
      ok = false;
    }

    if (!data.Contrasena || data.Contrasena.length < 8) {
      setErrorContrasenaMessage("*Mínimo 8 caracteres");
      ok = false;
    } else if (data.Contrasena !== User.Contrasena) {
      setErrorContrasenaMessage("*Usuario no encontrado");
      ok = false;
    }

    if (ok) {
      setProfile({ name: User.Correo, photo: "" });
      router.push("/");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={[globalStyles.ContainerLogin, { backgroundColor: bg }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={15}
      >
        <Ionicons
          name="close"
          onPress={() => router.push("/")}
          size={35}
          style={[
            {
              alignSelf: "flex-end",
              paddingRight: 25,
              paddingTop: -30,
              marginBottom: 30,
            },
            {
              color: bg === "#000" ? "white" : "black",
            },
          ]}
        />
        <ThemedText
          style={[
            globalStyles.TextLogin,
            { color: bg === "#000" ? "white" : "black" },
          ]}
        >
          Ingresar a mi cuenta
        </ThemedText>
        <ThemedText
          style={[
            { marginTop: -5, marginBottom: 20 },
            { color: bg === "#000" ? "white" : "black" },
          ]}
        >
          Ingresa tu email y contraseña
        </ThemedText>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  { textAlign: "left", width: 300, marginBottom: 2 },
                  { color: bg === "#000" ? "white" : "black" },
                ]}
              >
                Email
              </Text>
              <View
                style={[
                  globalStyles.InputLogin,
                  errors.Correo && { borderColor: "red", borderWidth: 1 },
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  style={{
                    padding: 4,
                    marginLeft: 4,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: bg === "#000" ? "gray" : "black",
                  }}
                />
                <TextInput
                  placeholder="F@gmail.com"
                  value={value}
                  style={{
                    color: bg === "#000" ? "gray" : "black",
                    width: 200,
                  }}
                  onChangeText={(value) => onChange(value)}
                  {...register("Correo", { required: true })}
                />
              </View>
            </View>
          )}
          name="Correo"
        />
        <View
          style={{ marginTop: -20, justifyContent: "flex-start", width: 300 }}
        >
          {errors.Correo && (
            <ThemedText style={globalStyles.Error}>
              *Debes ingresar un correo
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
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text
                style={[
                  { width: 300, marginBottom: 2 },
                  { color: bg === "#000" ? "white" : "black" },
                ]}
              >
                Contraseña
              </Text>

              <View
                style={[
                  globalStyles.InputLogin,
                  errors.Correo && { borderColor: "red", borderWidth: 1 },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={bg === "#000" ? "gray" : "black"}
                  style={{ padding: 4, marginLeft: 4 }}
                />
                <TextInput
                  placeholder="Escribe tu contraseña"
                  style={{
                    color: bg === "#000" ? "gray" : "black",
                    width: 220,
                  }}
                  value={value}
                  onChangeText={(value) => {
                    {
                      onChange(value);
                    }
                  }}
                  secureTextEntry={showPassword ? false : true}
                  {...register("Contrasena", { required: true })}
                />
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={bg === "#000" ? "gray" : "black"}
                  style={{ padding: 4, marginLeft: 4 }}
                  onPress={() => {
                    showPasswords();
                  }}
                />
              </View>
            </View>
          )}
          name="Contrasena"
          rules={{ required: true }}
        />

        <View style={{ marginTop: -20, width: 300 }}>
          {errors.Contrasena && (
            <ThemedText style={globalStyles.Error}>
              *La contraseña es requerida
            </ThemedText>
          )}

          {ErrorContrasenaMessage &&
            ErrorContrasenaMessage !== ErrorCorreoMessage && (
              <ThemedText style={globalStyles.Error}>
                {ErrorContrasenaMessage}
              </ThemedText>
            )}
        </View>

        <Text
          style={[{ width: 300 }, { color: bg === "#000" ? "white" : "black" }]}
        >
          ¿Olvidaste tu contraseña?
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            width: 300,
          }}
        >
          <Checkbox
            style={{ width: 20, height: 20, borderRadius: 4 }}
            value={true}
          />
          <Text
            style={[
              { width: 300 },
              { color: bg === "#000" ? "white" : "black" },
            ]}
          >
            Recordarme
          </Text>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <ThemedText
            style={{
              color: text,
              width: 300,
              padding: 9,
              borderRadius: 10,
              marginTop: 5,
              backgroundColor: " rgb(59, 110, 62)",
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Ingresar
            </Text>
          </ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}
