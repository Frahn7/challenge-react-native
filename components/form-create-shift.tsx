import { FadeIn } from "./fade-in";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "@/globalStyle";
import { FormValues } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "@/utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./themed-text";
import { useEffect, useState } from "react";
import { useInsertShift } from "@/hooks/use-insert-shift";
import { BookingValue } from "./bookingScreen";
import { router } from "expo-router";
import Collapsible from "react-native-collapsible";
import { Picker } from "@react-native-picker/picker";

type Props = { booking: BookingValue };

export const FormCreateShift = ({ booking }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const { mutateAsync: insertShift, isPending } = useInsertShift();

  useEffect(() => {
    setCollapsed(false);
  }, [booking]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaForm),
    defaultValues: { paciente: "", medico: "", estado: "", telefono: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const nuevoTurno = {
      id: Date.now(),
      nombrePaciente: data.paciente,
      nombreDoctor: data.medico,
      fecha: booking.display,
      estado: data.estado,
      telefono: data.telefono,
    };

    await insertShift(nuevoTurno);

    router.replace("/");
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "rgb(240, 243, 244)",
              }}
            >
              <TouchableOpacity
                onPress={() => setCollapsed(!collapsed)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 5,
                  borderRadius: 6,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    paddingLeft: 6,
                  }}
                >
                  Turno médico
                </Text>

                {collapsed ? (
                  <Ionicons name="add-outline" size={25} />
                ) : (
                  <Ionicons name="remove-outline" size={25} />
                )}
              </TouchableOpacity>

              <Collapsible
                collapsed={collapsed}
                style={{
                  padding: 5,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    gap: 5,
                    alignItems: "flex-start",
                    paddingLeft: 6,
                    paddingBottom: 10,
                    borderRadius: 8,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="calendar-outline"
                      color={"green"}
                      size={20}
                    />
                    <Text style={{ fontSize: 16, marginLeft: 4 }}>
                      {booking!.display.split(" ")[0]}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="alarm-outline" color={"green"} size={20} />
                    <Text style={{ fontSize: 16, marginLeft: 4 }}>
                      {booking!.display.split(" ")[1]}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                      name="medical-outline"
                      color={"green"}
                      size={20}
                    />
                    <Text style={{ fontSize: 16, marginLeft: 4 }}>
                      Centro medico
                    </Text>
                  </View>
                </View>
              </Collapsible>

              {isPending ? (
                <Text>CARGANDO...</Text>
              ) : (
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    minHeight: 400,
                    marginTop: 7,
                    flex: 1,
                    marginBottom: 7,
                  }}
                >
                  <View style={{ padding: 15 }}>
                    <View style={{ borderBottomWidth: 0.5, padding: 4 }}>
                      <Text style={{ fontWeight: 800, fontSize: 17 }}>
                        Datos de contacto
                      </Text>
                    </View>
                    <Text
                      style={{
                        padding: 4,
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 15,
                      }}
                    >
                      Te notificaremos el turno
                    </Text>

                    <View style={{ padding: 4 }}>
                      <FadeIn delay={20 * 40}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <Text style={{ fontSize: 17 }}>Nombre *</Text>
                              <TextInput
                                placeholder="Nombre completo"
                                style={[
                                  globalStyles.InputCreate,
                                  errors.paciente && {
                                    borderColor: "red",
                                    borderWidth: 1,
                                  },
                                ]}
                                value={value}
                                onChangeText={(value) => onChange(value)}
                              />
                            </View>
                          )}
                          name="paciente"
                          rules={{ required: true }}
                        />
                        {errors.paciente && (
                          <Text style={globalStyles.ErrorCreate}>
                            *{errors.paciente.message}
                          </Text>
                        )}

                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <Text style={{ fontSize: 17 }}>
                                Nombre del medico *
                              </Text>
                              <TextInput
                                placeholder="Nombre del medico"
                                style={[
                                  globalStyles.InputCreate,
                                  errors.medico && {
                                    borderColor: "red",
                                    borderWidth: 1,
                                  },
                                ]}
                                value={value}
                                onChangeText={(value) => onChange(value)}
                              />
                            </View>
                          )}
                          name="medico"
                          rules={{ required: true }}
                        />
                        {errors.medico && (
                          <Text style={globalStyles.ErrorCreate}>
                            *{errors.medico.message}
                          </Text>
                        )}

                        <Controller
                          control={control}
                          name="estado"
                          rules={{ required: "El estado es obligatorio" }}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <Text style={{ fontSize: 17 }}>Estado *</Text>
                              <View
                                style={[
                                  globalStyles.InputCreate,
                                  errors.estado && {
                                    borderColor: "red",
                                    borderWidth: 1,
                                  },
                                ]}
                              >
                                <Picker
                                  selectedValue={value}
                                  onValueChange={(itemValue) =>
                                    onChange(itemValue)
                                  }
                                >
                                  <Picker.Item
                                    label="Seleccionar..."
                                    value={null}
                                    enabled={false}
                                  />
                                  <Picker.Item
                                    label="Aprobado"
                                    value="Aprobado"
                                  />
                                  <Picker.Item
                                    label="Pendiente"
                                    value="Pendiente"
                                  />
                                </Picker>
                              </View>
                            </View>
                          )}
                        />

                        {errors.estado && (
                          <Text style={globalStyles.ErrorCreate}>
                            *
                            {errors.estado.message && (
                              <Text>El estado es obligatorio</Text>
                            )}
                          </Text>
                        )}

                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <Text style={{ fontSize: 17 }}>Teléfono *</Text>
                              <TextInput
                                placeholder="Teléfono"
                                style={[
                                  globalStyles.InputCreate,
                                  errors.telefono && {
                                    borderColor: "red",
                                    borderWidth: 1,
                                  },
                                ]}
                                value={value}
                                onChangeText={(value) => {
                                  const numericValue = value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  onChange(numericValue);
                                }}
                                keyboardType="numeric"
                              />
                              <Text style={{ marginBottom: 5 }}>
                                Ingresá tu número con código de área, sin el 0 y
                                sin el 15. Ej: 1123456789
                              </Text>
                            </View>
                          )}
                          name="telefono"
                          rules={{
                            required: "El teléfono es obligatorio",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Solo se permiten números",
                            },
                          }}
                        />
                        {errors.telefono && (
                          <Text style={globalStyles.ErrorCreate}>
                            *{errors.telefono.message}
                          </Text>
                        )}
                      </FadeIn>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: "white",
          height: 80,
          bottom: 1,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: "rgb(59, 110, 62)",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            width: "90%",
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Agendar
          </ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
};
