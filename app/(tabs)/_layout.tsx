import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Provider } from "react-redux";
import { store } from "@/features/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
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
      </Tabs>
    </Provider>
  );
}
