import { CardShift } from "@/components/index/card-shift";
import Collapsible from "react-native-collapsible";
import { RootState } from "@/features/store";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTurnos } from "@/features/shiftSlice";
import { useEffect, useState } from "react";
import { useGetShifts } from "@/hooks/use-get-shift";
import { FadeIn } from "@/components/fade-in";
import { Ionicons } from "@expo/vector-icons";

export const CollapsedShift = () => {
  const dispatch = useDispatch();
  const turnos = useSelector((state: RootState) => state.shifts.turnos);
  const [collapsedTurn, setCollapsedTurn] = useState(true);

  const { data, isLoading } = useGetShifts();

  useEffect(() => {
    if (data) {
      dispatch(setTurnos(data));
    }
  }, [data, dispatch]);

  return (
    <View
      style={{
        marginTop: 10,
        width: "105%",
      }}
    >
      <TouchableOpacity onPress={() => setCollapsedTurn(!collapsedTurn)}>
        <Collapsible
          collapsed={collapsedTurn}
          collapsedHeight={35}
          style={{
            gap: 5,
            paddingLeft: 10,
            backgroundColor: "rgb(240, 243, 244)",
            width: "100%",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text
              style={{
                paddingLeft: 6,
                fontSize: 16,
                padding: 3,
                fontWeight: 700,
              }}
            >
              Turnos
            </Text>
            {collapsedTurn ? (
              <Ionicons
                name="remove-outline"
                onPress={() => setCollapsedTurn(!collapsedTurn)}
                size={20}
              />
            ) : (
              <Text
                style={{ fontSize: 20 }}
                onPress={() => setCollapsedTurn(!collapsedTurn)}
              >
                <Ionicons
                  name="add-outline"
                  onPress={() => setCollapsedTurn(!collapsedTurn)}
                  size={20}
                />
              </Text>
            )}
          </View>
        </Collapsible>
      </TouchableOpacity>

      <FadeIn delay={20 * 40}>
        {isLoading ? (
          <Text style={{ color: "white" }}>Cargando...</Text>
        ) : (
          collapsedTurn &&
          turnos.map((turno) => <CardShift turno={turno} key={turno.id} />)
        )}
      </FadeIn>
    </View>
  );
};
