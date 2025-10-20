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

  const fadeTo = (to: number, duration = 180) =>
    new Promise<void>((resolve) => {
      Animated.timing(opacity, {
        toValue: to,
        duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start(() => resolve());
    });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setVisible(true);
      await fadeTo(1);
      await new Promise((r) => setTimeout(r, 220));
      if (!cancelled) {
        await fadeTo(0, 160);
        if (!cancelled) setVisible(false);
      }
    })();

    return () => {
      cancelled = true;
    };
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
