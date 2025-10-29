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
import { BookingValue } from "./bookingScreen";
import { router, useLocalSearchParams } from "expo-router";
import Collapsible from "react-native-collapsible";
import { useEditShift } from "@/hooks/use-edit-shift";
import { editarTurno } from "@/features/shiftSlice";
import { useDispatch } from "react-redux";

type Props = { booking: BookingValue };

export const FormEditShift = ({ booking }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const { mutateAsync: editShift, isPending } = useEditShift();
  const dispatch = useDispatch();

  const { id, name, doctor, email, telefono } = useLocalSearchParams<{
    id: string;
    name: string;
    doctor: string;
    email: string;
    fecha: string;
    telefono: string;
  }>();

  useEffect(() => {
    setCollapsed(false);
  }, [booking]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      paciente: name,
      medico: doctor,
      email: email,
      telefono: telefono,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const turnoEditado = {
      id: Number(id),
      nombrePaciente: data.paciente,
      nombreDoctor: data.medico,
      fecha: booking.display,
      email: data.email,
      telefono: data.telefono,
    };

    dispatch(editarTurno(turnoEditado));
    await editShift({ id: Number(id), data: turnoEditado });
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
                                placeholder={name}
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
                                placeholder={doctor}
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
                          name="email"
                          rules={{ required: "El email es obligatorio" }}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <Text style={{ fontSize: 17 }}>Email *</Text>
                              <View>
                                <TextInput
                                  placeholder={email}
                                  style={[
                                    globalStyles.InputCreate,
                                    errors.email && {
                                      borderColor: "red",
                                      borderWidth: 1,
                                    },
                                  ]}
                                  value={value}
                                  onChangeText={(value) => onChange(value)}
                                />
                              </View>
                            </View>
                          )}
                        />

                        {errors.email && (
                          <Text style={globalStyles.ErrorCreate}>
                            *
                            {errors.email.message && (
                              <Text>El email es obligatorio</Text>
                            )}
                          </Text>
                        )}

                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <View>
                              <Text style={{ fontSize: 17 }}>Teléfono *</Text>
                              <TextInput
                                placeholder={telefono}
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
          {isPending ? (
            <ThemedText>Editando</ThemedText>
          ) : (
            <ThemedText
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Editar
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
