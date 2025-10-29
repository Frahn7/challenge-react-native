import { Platform } from "react-native";

type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;

const androidElevation: Record<ShadowLevel, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  8: 8,
  12: 12,
};

const iosPreset: Record<
  ShadowLevel,
  { radius: number; height: number; opacity: number }
> = {
  0: { radius: 0, height: 0, opacity: 0 },
  1: { radius: 2, height: 1, opacity: 0.12 },
  2: { radius: 3, height: 2, opacity: 0.14 },
  3: { radius: 4, height: 3, opacity: 0.16 },
  4: { radius: 6, height: 4, opacity: 0.18 },
  6: { radius: 8, height: 6, opacity: 0.2 },
  8: { radius: 10, height: 8, opacity: 0.22 },
  12: { radius: 14, height: 12, opacity: 0.24 },
};

export function shadow(level: ShadowLevel = 2, color = "#000") {
  if (Platform.OS === "android") {
    return {
      elevation: androidElevation[level],
      shadowColor: color,
    };
  }
  if (Platform.OS === "web") {
    const blur = iosPreset[level].radius * 2;
    const spread = -Math.max(1, Math.round(iosPreset[level].radius / 2));
    return {
      boxShadow: `0 ${iosPreset[level].height}px ${blur}px ${spread}px rgba(0,0,0,0.25)`,
    };
  }
  const p = iosPreset[level];
  return {
    shadowColor: color,
    shadowOpacity: p.opacity,
    shadowRadius: p.radius,
    shadowOffset: { width: 0, height: p.height },
  };
}
