import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "@/features/themeAtom";
import { order } from "@/utils/types";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [pref, setPref] = useAtom(themeAtom);

  const toggleTheme = () =>
    setPref(order[(order.indexOf(pref) + 1) % order.length]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        options={{
          href: null,
        }}
        name="index"
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
          tabBarLabel: "Perfil",
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
                flex: 1,
              }}
            >
              <Ionicons name="power-outline" size={24} color={"black"} />
              <Text
                style={{
                  fontSize: 11,
                  color: "black",
                  marginTop: 2,
                }}
              >
                Tema
              </Text>
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
