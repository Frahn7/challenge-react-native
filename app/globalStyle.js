import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  ContainerLogin: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginTop: -15,
  },
  InputLogin: {
    width: 300,
    marginBottom: 8,
  },
  TextLogin: {
    fontSize: 28,
    fontWeight: "bold",
  },
  Error: {
    color: "red",
    fontWeight: "bold",
  },
});
