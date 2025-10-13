import { useThemeColors } from "@/hooks/use-theme-colors";
import { Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { profileAtom } from "@/features/profileAtom";

export default function Profile() {
  const [profile, setProfile] = useAtom(profileAtom);
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
      setProfile({ name: profile.name, photo: result.assets[0].uri });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 80,
        alignItems: "center",
        gap: 12,
        backgroundColor: bg,
      }}
    >
      <View style={{ alignContent: "flex-end", width: 300 }}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={text}
          onPress={() => router.push("/")}
        />
      </View>
      <Text style={{ color: text, fontSize: 28, fontWeight: "bold" }}>
        Bienvenido {profile.name} !!
      </Text>
      <TouchableOpacity
        onPress={openCamera}
        style={{
          alignItems: "center",
          gap: 3,
          borderWidth: 3,
          padding: 3,
          borderColor: "red",
        }}
      >
        <Text style={{ color: text }}>SUBIR FOTO</Text>
        <Ionicons name="image" size={24} color={text} />
      </TouchableOpacity>

      {profile.photo && (
        <Image
          source={{ uri: profile.photo }}
          style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }}
        />
      )}
    </View>
  );
}
