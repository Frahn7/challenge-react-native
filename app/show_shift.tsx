import { CollapsedShift } from "@/components/shift/CollapsedShift";
import { Stack } from "expo-router";

export default function ShowShift() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CollapsedShift />
    </>
  );
}
