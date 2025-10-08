import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
        delay,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        delay,
      }),
    ]).start();
  }, [opacity, translate, delay]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: translate }] }}>
      {children}
    </Animated.View>
  );
};
