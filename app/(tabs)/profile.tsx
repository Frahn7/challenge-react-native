import { useThemeColors } from "@/hooks/use-theme-colors";
import { Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function Profile() {
  const [photo, setPhoto] = useState<string | null>(null);

  const { bg, text } = useThemeColors();

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se necesita permiso para acceder a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        backgroundColor: bg,
      }}
    >
      <Text style={{ color: text, fontSize: 28, fontWeight: "bold" }}>
        Hola bienvenido!
      </Text>
      <TouchableOpacity onPress={openCamera}>
        <Text style={{ color: text }}>Subir foto</Text>
      </TouchableOpacity>

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }}
        />
      )}
    </View>
  );
}
