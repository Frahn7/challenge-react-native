import { useThemeColors } from "@/hooks/use-theme-colors";
import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { profileAtom } from "@/features/profile/profileAtom";
import Line from "@/components/ui/Line";

export default function Profile() {
  const [profile, setProfile] = useAtom(profileAtom);
  const { bg, text } = useThemeColors();

  const openCameraOrGallery = async () => {
    Alert.alert(
      "Seleccionar imagen",
      "Elige una opción",
      [
        { text: "Cámara", onPress: openCamera },
        { text: "Galería", onPress: openGallery },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

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

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Se necesita permiso para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
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
        gap: 30,
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
      <Line />
      <Text style={{ color: text, fontSize: 30, fontWeight: "bold" }}>
        Bienvenido a tu perfil
      </Text>
      <Line />
      {profile.photo ? (
        <>
          <Image
            source={{ uri: profile.photo }}
            style={{
              width: 200,
              height: 200,
              marginTop: 20,
              borderRadius: 999,
              borderColor: "white",
              borderWidth: 2,
            }}
          />
          <View>
            <Text
              onPress={openCameraOrGallery}
              style={{
                position: "absolute",
                top: -70,
                left: 30,
                color: "black",
                padding: 5,
                borderRadius: 10,
                backgroundColor: "#b6b5b5",
              }}
            >
              <Ionicons name="person-add" size={40} />
            </Text>
          </View>
        </>
      ) : (
        <Ionicons
          onPress={openCameraOrGallery}
          name="person-circle-outline"
          size={50}
        />
      )}

      <TouchableOpacity
        onPress={openCameraOrGallery}
        style={{
          alignItems: "center",
          gap: 3,
          width: "80%",
          borderWidth: 2,
          backgroundColor: "rgb(65, 110, 63)",
          padding: 4,
          borderRadius: 9,
          borderColor: "white",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>SUBIR FOTO</Text>
        <Ionicons name="image" size={26} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}
