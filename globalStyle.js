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
  },
  Error: {
    color: "red",
    fontWeight: "bold",
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
});
