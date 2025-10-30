import { CardShift } from "@/components/shift/card-shift";
import { Alert, Text, View } from "react-native";
import { FadeIn } from "@/components/ui/fade-in";
import { useShifts } from "@/hooks/use-shift";

export const CollapsedShift = () => {
  const { turnos: data, isLoading, error, isError } = useShifts();

  if (isError) {
    const msg = (error as Error).message;
    Alert.alert("Hubo un error", msg || "Intentalo de nuevo");
  }

  return (
    <View
      style={{
        marginTop: 10,
        width: "100%",
        padding: 10,
      }}
    >
      <FadeIn delay={20 * 40}>
        {isLoading ? (
          <Text style={{ color: "white" }}>Cargando...</Text>
        ) : (
          data.map((turno) => <CardShift turno={turno} key={turno.id} />)
        )}
      </FadeIn>
    </View>
  );
};
