import { globalStyles } from "@/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, View } from "react-native";
import { ThemedText } from "../themed-text";
import { router } from "expo-router";

type Props = { open: boolean; onClose: () => void; children?: React.ReactNode };

export const ModalIndex = ({ open, onClose, children }: Props) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[globalStyles.ModalContainer]}>
        <View style={[globalStyles.ModalCardContainer]}>
          <Text style={{ textAlign: "right", padding: 1 }} onPress={onClose}>
            <Ionicons name="close-outline" size={30} />
          </Text>
          <View style={[globalStyles.ModalCard]}>
            <Ionicons name="person-outline" size={24} color="green" />
            <ThemedText
              onPress={() => router.push("/login")}
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "left",
                marginLeft: 8,
              }}
            >
              Iniciar sesión
            </ThemedText>
          </View>
        </View>
      </View>
    </Modal>
  );
};
