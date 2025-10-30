import Collapsible from "react-native-collapsible";
import { medics } from "@/utils/utils";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/use-theme-colors";

export const CollapsedDoctors = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { bg } = useThemeColors();

  return (
    <>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingVertical: 6,
            borderTopColor: "black",
            borderTopWidth: 0.5,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="person-outline"
              size={18}
              color={bg === "#000" ? "white" : "black"}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginLeft: 8,
                color: bg === "#000" ? "white" : "black",
              }}
            >
              Profesionales
            </Text>
          </View>
          <Ionicons
            name={collapsed ? "chevron-down-outline" : "chevron-up-outline"}
            size={20}
            color={bg === "#000" ? "white" : "black"}
          />
        </View>
      </TouchableOpacity>
      <Collapsible
        collapsed={collapsed}
        style={{
          gap: 10,
          paddingLeft: 10,
          paddingTop: 3,
        }}
      >
        {medics.map((medic, k) => (
          <View key={k} style={{ flexDirection: "column", gap: 5 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={{ uri: medic.images }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  borderWidth: 2,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: bg === "#000" ? "white" : "black",
                }}
              >
                {medic.doctor}
              </Text>
            </View>
          </View>
        ))}
      </Collapsible>
    </>
  );
};
