import "@/features/notifications/notifications";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Provider } from "react-redux";
import { store, persistor } from "@/features/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { resolvedThemeAtom } from "@/features/theme/themeAtom";
import { useEffect } from "react";
import GlobalRouteLoading from "@/components/ui/global-route-loading";
import {
  registerNotificationResponse,
  unregisterNotificationResponse,
} from "../features/notifications/notificationListenner";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

function AppShell() {
  const systemScheme = useColorScheme();
  const pref = useAtomValue(resolvedThemeAtom);
  const scheme = pref === "dark" ? (systemScheme ?? "light") : pref;

  useEffect(() => {
    registerNotificationResponse();
    return () => unregisterNotificationResponse();
  }, []);

  return (
    <PersistGate
      loading={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      }
      persistor={persistor}
    >
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style={scheme === "dark" ? "light" : "dark"} />
          </ThemeProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </PersistGate>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GlobalRouteLoading />
      <AppShell />
    </Provider>
  );
}
