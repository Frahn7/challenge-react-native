import { globalStyles } from "@/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, View } from "react-native";
import { ThemedText } from "../themed-text";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { profileAtom } from "@/features/profileAtom";
import { ThemeToggle } from "../theme-toggle";

type Props = { open: boolean; onClose: () => void; children?: React.ReactNode };

export const ModalIndex = ({ open, onClose, children }: Props) => {
  const [profile] = useAtom(profileAtom);

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
          <View>
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
            {profile.name.length > 1 && (
              <View style={[globalStyles.ModalCard]}>
                <Ionicons name="happy-outline" size={24} color="green" />
                <ThemedText
                  onPress={() => router.push("/profile")}
                  style={{
                    color: "black",
                    fontSize: 16,
                    textAlign: "left",
                    marginLeft: 8,
                  }}
                >
                  Perfil
                </ThemedText>
              </View>
            )}
          </View>
          <ThemeToggle />
        </View>
      </View>
    </Modal>
  );
};
