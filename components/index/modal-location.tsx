import { globalStyles } from "@/globalStyle";
import { Props } from "@/utils/types";
import { Days } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";

export const ModalLocation = ({ open, onClose }: Props) => {
  const handleOpenMap = () => {
    const url =
      "https://www.google.com.ar/maps/place/Cardiologia+del+Sur/@-34.7777656,-58.3927099,19.5z/data=!4m6!3m5!1s0x95bcd3fe6c5bfb55:0xd645073a9476fb94!8m2!3d-34.7779514!4d-58.3927528!16s%2Fg%2F11h1z2dpmd?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D";
    Linking.openURL(url);
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={globalStyles.ModalContainer}>
        <View style={[globalStyles.ModalCardContainer, { height: 500 }]}>
          <Text style={{ textAlign: "right", padding: 1 }} onPress={onClose}>
            <Ionicons name="close-outline" size={30} />
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              borderBottomWidth: 0.5,
              padding: 3,
            }}
          >
            Ubicación y horario
          </Text>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={handleOpenMap}>
              <Image
                source={require("@/assets/images/maps.png")}
                style={{
                  width: 250,
                  borderWidth: 0.5,
                  height: 150,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            {Days.map((day, k) => (
              <View
                key={k}
                style={{
                  flexDirection: "row",
                  padding: 4,
                  justifyContent: "space-between",
                  marginTop: 10,
                  borderBottomWidth: 0.5,
                }}
              >
                <Text>{day.dia}</Text>
                <Text>{day.hs}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};
