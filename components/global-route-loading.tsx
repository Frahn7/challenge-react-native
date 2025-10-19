import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { usePathname } from "expo-router";

export default function GlobalRouteLoading() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  // pequeño helper para fade in/out
  const fadeTo = (to: number, duration = 180) =>
    new Promise<void>((resolve) => {
      Animated.timing(opacity, {
        toValue: to,
        duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start(() => resolve());
    });

  // cuando cambia la ruta, mostramos overlay breve
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setVisible(true);
      await fadeTo(1); // fade in rápido
      // Espera un tick para dar tiempo al mount de la nueva screen.
      // Podés reemplazar este setTimeout por tu propio “isFetching” global
      // si querés que dure hasta que carguen datos.
      await new Promise((r) => setTimeout(r, 220));
      if (!cancelled) {
        await fadeTo(0, 160); // fade out
        if (!cancelled) setVisible(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // se dispara en cada cambio de pathname
  }, [pathname]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <View style={styles.card}>
        <ActivityIndicator size="large" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    zIndex: 9999,
  },
  card: {
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 8,
  },
});
