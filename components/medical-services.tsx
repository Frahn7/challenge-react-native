import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

type Props = {
  specialty: string;
  doctor: string;
  durationMin: number;
  priceLabel: string;
  images?: string[];
  description?: string;
  onPress?: () => void;
};

export const MedicalServiceCard: React.FC<Props> = ({
  specialty,
  doctor,
  durationMin,
  priceLabel,
  images = [],
  description,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{specialty}</Text>
      </View>

      <Text style={styles.subtitle}>{doctor}</Text>
      <Text style={styles.meta}>{durationMin} min</Text>
      <Text style={styles.price}>{priceLabel}</Text>

      {!!images.length && (
        <View style={styles.avatarsRow}>
          {images.slice(0, 4).map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={[styles.avatar, { left: i * 22 }]}
            />
          ))}
        </View>
      )}

      {!!description && <Text style={styles.description}>{description}</Text>}

      <View style={styles.footer}>
        <Pressable hitSlop={8}>
          <Text style={styles.moreInfo}>Más información</Text>
        </Pressable>

        <Pressable style={styles.cta} onPress={onPress}>
          <Text style={styles.ctaText}>Agendar turno</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#2f6e43",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
  subtitle: { fontSize: 14, color: "#374151" },
  meta: { fontSize: 14, color: "#6b7280", marginTop: 2 },
  price: { fontSize: 16, fontWeight: "600", color: "#1f2937", marginTop: 2 },
  avatarsRow: { height: 40, marginTop: 8, marginBottom: 4 },
  avatar: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
  },
  description: { fontSize: 14, color: "#6b7280", marginTop: 2 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  moreInfo: { fontSize: 13, textDecorationLine: "underline", color: "#1f4d2f" },
  cta: {
    backgroundColor: "rgb(59, 110, 62)",
    borderRadius: 8,
    width: 150,
    paddingVertical: 10,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontWeight: "700" },
});
