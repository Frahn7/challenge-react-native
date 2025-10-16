import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  ContainerLogin: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  InputLogin: {
    width: 300,
    marginBottom: 8,
  },
  TextLogin: {
    fontSize: 28,
    fontWeight: "bold",
    color: "rgb(59, 110, 62)",
  },
  Error: {
    color: "red",
    fontSize: 14,
  },
  InputEdit: {
    backgroundColor: "white",
    width: 300,
    color: "black",
    marginBottom: 5,
  },
  TextEdit: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  InputCreate: {
    width: 300,
    color: "black",
    marginBottom: 5,
  },
  TextCreate: {
    fontWeight: "bold",
    paddingBottom: 6,
    fontSize: 30,
  },
  ErrorCreate: {
    color: "red",
    fontWeight: "bold",
    marginTop: -5,
    textAlign: "right",
  },
});
