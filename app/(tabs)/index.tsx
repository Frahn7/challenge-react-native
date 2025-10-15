import { ThemedText } from "@/components/themed-text";
import { Stack, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { setTurnos } from "@/features/shiftSlice";
import React, { useEffect } from "react";
import { useGetShifts } from "@/hooks/use-get-shift";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeIn } from "@/components/fade-in";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ThemeToggle } from "@/components/theme-toggle";
import { CardShift } from "@/components/card-shift";
import Line from "@/components/line";

export default function HomeScreen() {
  const turnos = useSelector((state: RootState) => state.shifts.turnos);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetShifts();

  useEffect(() => {
    if (data) {
      dispatch(setTurnos(data));
    }
  }, [data, dispatch]);

  const { bg, text } = useThemeColors();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Stack.Screen options={{ headerShown: false }} />
          <View
            style={{
              paddingLeft: 50,
              gap: 80,
              justifyContent: "center",
              width: 300,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="log-in-sharp"
              size={24}
              color={text}
              onPress={() => router.push("/login")}
            />
            <ThemeToggle />
          </View>

          <Line />

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 20,
              gap: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 25,
                  color: text,
                }}
              >
                Gestion de turnos
              </ThemedText>
            </View>

            <TouchableOpacity onPress={() => router.push("/create_shift")}>
              <ThemedText
                style={{
                  fontSize: 20,
                  color: "black",
                  padding: 2,
                  width: 50,
                  borderRadius: 999,
                  borderColor: "blue",
                  borderWidth: 1,
                  backgroundColor: "white",
                  textAlign: "center",
                }}
              >
                +
              </ThemedText>
            </TouchableOpacity>
            <Line />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <FadeIn delay={20 * 40}>
                {isLoading ? (
                  <Text style={{ color: "white" }}>Cargando...</Text>
                ) : (
                  turnos.map((turno) => (
                    <CardShift turno={turno} key={turno.id} />
                  ))
                )}
              </FadeIn>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
