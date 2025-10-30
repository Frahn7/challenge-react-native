import { medics } from "@/features/shift/mock-medics";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SelectDoctor = ({
  onSelectDoctor,
}: {
  onSelectDoctor: (doctor: string) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        gap: 15,
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            padding: 10,
            textAlign: "left",
          }}
        >
          Selecciona el profesional para tus servicios
        </Text>
      </View>
      <View style={{ gap: 25 }}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => onSelectDoctor(medics[1].doctor)}
        >
          <Text style={{ fontSize: 20, textAlign: "center", fontWeight: 700 }}>
            Primer profesional disponible -{">"}
          </Text>
        </TouchableOpacity>
        {medics.map((medic, k) => (
          <TouchableOpacity
            key={k}
            style={styles.buttons}
            onPress={() => onSelectDoctor(medic.doctor)}
          >
            <Image
              source={{ uri: medic.images }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                borderWidth: 2,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {medic.doctor}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgb(59,110,62, 0.2)",
  },
});
